# Dharana Spaces — logo and AI chatbot update

## What changed
- Replaced the circular `D` placeholders in the navigation and footer with the Dharana emblem.
- Updated the intro screen to use the complete Dharana Spaces logo.
- Added the Dharana emblem as the site favicon.
- Added a responsive floating chat assistant with suggested questions and conversation history.
- Added `POST /api/chat` to the existing Cloudflare Worker. It calls Groq from the Worker, so the Groq key is never exposed in browser code.
- Kept the existing `/api/enquiry` route, Neon/Hyperdrive database integration, and Resend email flow intact.

## Configure Groq on Cloudflare

The Worker expects a Cloudflare secret named `GROQ_API_KEY`.

1. Open a terminal in the `cloudflare-worker` folder.
2. Install dependencies if needed:
   ```bash
   npm ci
   ```
3. Add your Groq API key as a Worker secret:
   ```bash
   npx wrangler secret put GROQ_API_KEY
   ```
   Paste the Groq key when prompted. Do not put it in `app.js`, `wrangler.toml`, or a committed `.env` file.
4. Deploy the existing Worker:
   ```bash
   npx wrangler deploy
   ```

The existing Worker name and Hyperdrive binding in `wrangler.toml` are unchanged. The new chat route uses the existing `https://dharana-api.sushilsb.workers.dev/api/chat` endpoint configured in the website.

## Test locally

Serve the `public` folder (not the repository root):
```bash
cd public
python -m http.server 5500
```
Then open `http://localhost:5500`. The Worker CORS allowlist includes `http://localhost:5500` and `http://127.0.0.1:5500`.

The chat endpoint itself will work after the updated Worker is deployed and the `GROQ_API_KEY` secret is configured.

## Important
- The `.env` file and `node_modules` folders are intentionally not included in this ZIP.
- Keep secrets in Cloudflare Worker Secrets. Never commit API keys to GitHub.
- The assistant is grounded in the supplied Dharana Spaces brand profile. It does not make up prices, hours, or live availability; it directs visitors to the official phone/email for unconfirmed details.
