

## Contact Form with Email Forwarding via Resend

### Prerequisites (secrets needed)

Two secrets must be configured before the edge function will work:

1. **RESEND_API_KEY** - Get a free API key from [resend.com](https://resend.com). The free tier allows 100 emails/day.
2. **CONTACT_EMAIL** - Your personal email address where messages will be forwarded. This is stored server-side only and never exposed to the browser.

### Implementation steps

1. **Create `contact_messages` table** - Stores name, email, message, and created_at. RLS policy allows public inserts (no auth required), no select/update/delete.

2. **Create `send-contact-email` edge function** - Receives name, email, and message. Inserts into the database, then calls the Resend API to forward the message to `CONTACT_EMAIL`. Your email is read from the secret, never from the client.

3. **Build contact form dialog** - A new component on the Help page using a Radix Dialog with:
   - Glassmorphism styling (`bg-white/80 backdrop-blur-xl border-white/40`)
   - Blurred backdrop (`backdrop-blur-sm`)
   - Name, Email, Message fields using existing `Input` and `Textarea` components
   - Zod validation via `react-hook-form`
   - Toast confirmation on success

4. **Add trigger to Help page** - A subtle link at the bottom: "Need more help? Contact us" with a `Mail` icon, opening the dialog.

### Technical details

- The edge function sets `verify_jwt = false` since no auth is required.
- The function validates inputs server-side with length limits before inserting or emailing.
- CORS headers included for browser calls.
- The Resend API is called with `from: "Langly <onboarding@resend.dev>"` (Resend's default sender on the free tier) and `to` set from the secret.

