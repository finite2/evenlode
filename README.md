# Evenlode Badminton Club - Draft website

## Setup

Install node 16, and yarn. Then install the dependencies from a terminal

```bash
yarn
```

### Secrets

You will need to create a `.env` file with the keys contained in the `env.env`. Since these are secrets you will need to ask for these.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

Each `page.tsx` in the `app` folder is a webpage. Their url route is based on the file path with /app/ as the root page.

[API routes](https://nextjs.org/docs/api-routes/introduction) live in the `pages/api` folder.

# Tech stack

## nextjs

This is a nextjs app. Frontend code is written in react and backend code is express.js like.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## next-auth

Authentication is handled by the open source library [next-auth](https://next-auth.js.org/getting-started/introduction).

## Prisma

We use the [Prisma library](https://www.prisma.io/docs) to interact with a Postgres database. This is currently hosted on [supabase](https://supabase.com/).

## Deployed on Vercel

I will deploy and update this in the near future.
