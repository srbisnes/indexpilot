# Google Authentication Status

## Audit result

The current main branch contains Google OAuth environment variable placeholders, but the application source currently does not contain a Google authentication provider, callback route, session layer, or protected user area.

For that reason, Google Login is not documented as implemented in this repository.

If Google Login is already configured in another environment or version, it should be reconciled into main before this repository is presented as the source of truth.

## Production implementation target

Recommended architecture:

1. Google OAuth authorization.
2. Server-side callback.
3. Secure HTTP-only session.
4. User identity mapped to an internal user record.
5. Wallet address linked to the authenticated user only after explicit wallet connection.
6. Server-side authorization for protected APIs.
7. No OAuth client secret exposed to the browser.

## Acceptance criteria

- Sign in with Google.
- Sign out.
- Session survives refresh.
- Invalid or expired sessions are rejected server-side.
- Wallet connection remains user-controlled.
- Google identity and wallet address can be linked and unlinked safely.
- No secrets appear in client bundles or Git history.
- Authentication tests cover callback, session and authorization failures.
