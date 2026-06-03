# Contact form → Gmail

Messages from `/contact` and `/all` are sent to **eleonora.nocentini@gmail.com** via the API route `src/app/api/contact/route.ts`.

## One-time setup (Gmail App Password)

Google does not allow your normal Gmail password in apps. Use an **App Password**:

1. Sign in to [Google Account](https://myaccount.google.com/) with **eleonora.nocentini@gmail.com**.
2. Turn on **2-Step Verification** (required for app passwords).
3. Open **Security** → **2-Step Verification** → **App passwords** (or search “App passwords”).
4. Create a password for “Mail” / “Other (Portfolio)”.
5. Copy the 16-character password (no spaces).

## Local (`.env.local`)

```bash
GMAIL_USER=eleonora.nocentini@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
CONTACT_TO_EMAIL=eleonora.nocentini@gmail.com
```

Restart `npm run dev` after saving.

## Vercel (production)

In the **wordpress-portfolio** project → **Settings** → **Environment Variables**, add the same three variables for **Production** (and Preview if you want).

Redeploy after saving.

## Test

1. Open `/contact`
2. Fill in name, email, message → **Send**
3. Check inbox (and spam) for subject `[Portfolio] …`

If variables are missing, the form shows a clear error and the mailto link in the white card still works.
