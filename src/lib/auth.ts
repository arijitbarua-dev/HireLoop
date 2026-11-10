import { betterAuth } from "better-auth";
import { APIError, getOAuthState } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db("HireLoop");

const ROLES = ["seeker", "recruiter", "admin"] as const;

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                input: true,
                defaultValue: "seeker",
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                // Only allow known role values, so clients can't
                // store arbitrary strings in the role field.
                before: async (user) => {
                    // On social sign-up the chosen account type can't be
                    // sent in the request body, so it travels through the
                    // OAuth state (see "Sign up with Google" on the
                    // sign-up page). Note: user.role is pre-filled with
                    // the field's default value ("seeker") before this
                    // hook runs, so the state's explicit choice must win.
                    const oauthState = await getOAuthState();
                    const stateRole =
                        typeof oauthState?.role === "string"
                            ? oauthState.role
                            : undefined;

                    const role = (stateRole ??
                        (user as { role?: string }).role ??
                        "seeker") as (typeof ROLES)[number];

                    if (!ROLES.includes(role)) {
                        throw new APIError("BAD_REQUEST", {
                            message: "Invalid account type.",
                        });
                    }

                    return { data: { ...user, role } };
                },
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // Google sign-in must not silently create an account. Users
            // without an account are sent to the sign-up page, which
            // requests sign-up explicitly via requestSignUp: true.
            disableImplicitSignUp: true,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});