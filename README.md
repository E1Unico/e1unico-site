This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Domain for-sale pages

A few domain names can be pointed at this project to show one plain "for sale" page with a private offer form
(`lib/for-sale.ts`, `app/forsale/`, `app/api/forsale-offer/`). The page carries no site layout, scripts, icons, chat
widget or owner details, and nothing is ever sent to the person making an offer. **The domain names are not in this
repository (it is public); they come from environment variables:**

- `FOR_SALE_HOSTS` (read at build time and at run time): comma list of `host` or `host=Display` (the display form may only change
  letter case). The `www.` form is served too. Empty = the feature does nothing.
- `FOR_SALE_ALIAS_LOCAL` (optional): e.g. `offers` shows `offers@<the domain>` on the page. Set it only once mail to that
  address is forwarded somewhere.
- Offers are delivered through the same private channels as the other forms: Telegram (`TELEGRAM_BOT_TOKEN` + `UNICO_TELEGRAM_CHAT_ID`),
  and email only when `RESEND_API_KEY` and `FOR_SALE_OFFER_TO` are both set (`FOR_SALE_OFFER_FROM` optional).

Order to go live: set the environment variables, deploy, then add the domains to the project and point their DNS here.
Run `npm run test:for-sale` for the unit tests.
