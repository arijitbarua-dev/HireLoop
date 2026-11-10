// Friendly messages for the error codes better-auth redirects back to
// the app with (via errorCallbackURL) when an OAuth flow fails.
const OAUTH_ERROR_MESSAGES: Record<string, string> = {
    access_denied: "Google sign-in was cancelled. Please try again.",
    account_not_linked:
        "An account with this email already exists. Please sign in with your email and password.",
    email_not_found:
        "Your Google account doesn't share an email address with us. Please sign up with email instead.",
    state_mismatch: "Google sign-in session expired. Please try again.",
};

export function oauthErrorMessage(code: string): string {
    return OAUTH_ERROR_MESSAGES[code] ?? "Google sign-in failed. Please try again.";
}