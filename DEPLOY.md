# 🚀 Deploying PadhoDost to Vercel

Everything is ready. The production build passes clean, the code is committed, and
the Vercel CLI is installed. These are the only steps left — all done by **you**,
because they need your Vercel login (a browser sign-in nobody else can do for you).

Run every command **inside the project folder**:
`C:\Users\LENOVO\OneDrive\Desktop\Students portal\padhodost`

---

## Step 1 — Log in to Vercel (one time)

```
vercel login
```

A browser opens → choose **Continue with Google** (or GitHub/email) → **Authorize**.
Back in the terminal you'll see "Congratulations!". Done.

> No Vercel account yet? The same screen creates one for free — just sign in with Google.

---

## Step 2 — Link the project (no deploy yet)

```
vercel link
```

Answer the prompts:

| Prompt | Answer |
|---|---|
| Set up "…padhodost"? | **Y** → Enter |
| Which scope? | your name → Enter |
| Link to existing project? | **N** |
| What's your project's name? | **padhodost** → Enter |
| In which directory is your code located? | **./** → Enter |

This just creates the project on Vercel. **Do not deploy yet** — the site needs its
database keys first (Step 3), or the build will fail.

---

## Step 3 — Add the 4 environment variables

Go to **[vercel.com/dashboard](https://vercel.com/dashboard) → padhodost → Settings → Environment Variables**.

Click the **"Import .env"** / paste box and add these four. For the two `DATABASE`
ones, **open your `.env` file in Notepad and copy the full value** (they contain your
DB password, so they're not printed here):

| Name | Value |
|---|---|
| `DATABASE_URL` | *(copy line 12 from your `.env`)* |
| `DIRECT_URL` | *(copy line 15 from your `.env`)* |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kbyiokawhcjupezbdvsj.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_CCknyBgwf1DhCL-Zgw3FEA_RQOitNP3` |

Make sure each is enabled for **Production** (the default). Save.

---

## Step 4 — Deploy to production 🎉

```
vercel --prod
```

Wait ~2 minutes. It prints a live URL like **`https://padhodost.vercel.app`**.
Open it — PadhoDost is on the internet.

---

## Step 5 — Fix login redirects (important!)

So sign-in works on the live site, go to **Supabase → Authentication → URL Configuration**:

- **Site URL:** `https://padhodost.vercel.app`
- **Redirect URLs → Add:** `https://padhodost.vercel.app/auth/callback`

(You'll add `https://padhodost.com` here too once the domain is connected.)

---

## Later — your custom domain (padhodost.com)

Vercel → padhodost → **Settings → Domains → Add** `padhodost.com`.
Vercel shows a DNS record to add at **Cloudflare** (where you bought it). Add it, wait a
few minutes, and padhodost.com goes live with automatic HTTPS.

## Later — Google AdSense (your revenue)

Once the site is live and has a few days of content/traffic, apply at
**adsense.google.com** → add `padhodost.com` → paste their script into the site.
(AdSense needs a live site with real content to approve — that's why it comes after launch.)

---

### Updating the site after launch

Any time you change code: `git add -A && git commit -m "..."` then `vercel --prod`.
(Or connect the GitHub repo in Vercel for automatic deploys on every push.)
