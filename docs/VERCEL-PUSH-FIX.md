# Fix: Push updates and deploy (Vercel CLI error)

The error `FetchError: invalid json response body` / `Unexpected token '<', "<html>"` means Vercel's API returned an HTML page instead of JSON (often auth or temporary API issue).

## Option A: Push to Git (recommended)

If your Vercel project is connected to this repo, pushing will trigger a deploy and you don't need the CLI.

1. **Commit and push** (run in project root):

   ```bash
   git add -A
   git commit -m "About page images, What We Do, Compliance/Infrastructure updates"
   git push origin staging
   ```

   Use your real branch name if not `staging` (e.g. `main`).

2. In the [Vercel dashboard](https://vercel.com/dashboard), confirm the project is connected to this repo. The push will start a new deployment.

---

## Option B: Fix Vercel CLI and deploy

1. **Re-login** (finish in browser when prompted):

   ```bash
   npx vercel login
   ```

   Open the URL it prints, log in, then press Enter in the terminal.

2. **Re-link the project** (pick your team and existing project when asked):

   ```bash
   rm -rf .vercel
   npx vercel link
   ```

3. **Deploy:**

   ```bash
   npx vercel --prod
   ```

If the same error appears again, use **Option A** (Git push); Vercel will deploy from the connected repo.
