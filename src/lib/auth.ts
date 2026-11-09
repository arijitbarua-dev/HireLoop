import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
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
                    const role = ((user as { role?: string }).role ??
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
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});