# Mehta Footwear — production e-commerce foundation

## Stack
- Responsive storefront: HTML/CSS/JS served by Express
- API/backend: Node.js + Express
- Database: PostgreSQL + Prisma
- Auth: bcrypt + JWT, admin role protection
- Payments: Razorpay Orders + server-side signature verification + webhook verification
- Shipping: Shiprocket API integration point, including order/AWB/tracking webhooks
- Security: Helmet, server-side validation, environment secrets

## Run locally
1. Install Node.js 20+ and PostgreSQL.
2. Copy `.env.example` to `.env` and fill values.
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `npm run seed`
7. `npm start`
8. Open http://localhost:3000

## Production checklist
- Use a managed PostgreSQL database and HTTPS.
- Set a long random JWT_SECRET.
- Use Razorpay live keys only as server environment variables.
- Configure Razorpay webhook to `/api/payments/razorpay/webhook` with a secret.
- Create a Shiprocket API user; its docs state API tokens are generated through the authentication API and Shiprocket supports webhooks for tracking updates.
- Implement the Shiprocket service module in `src/` using the official API credentials; do not expose them to browser code.
- Put the app behind a reverse proxy/CDN, enable backups, monitoring and log retention.
- Add transactional email/SMS provider credentials before launch.
- Configure a real WhatsApp Business number in the frontend environment/build.

## Important
The included storefront is fully interactive for browsing/cart/order-form flows. Live Razorpay and Shiprocket calls require your own accounts and credentials. Never send those credentials, OTPs, passwords or bank details in chat.
