# Sembark Store

A React + TypeScript e-commerce app built with Vite, Tailwind CSS v4, and shadcn/ui.

## Stack

- **React 19** + **TypeScript**
- **Vite** (dev server & bundler)
- **Tailwind CSS v4** + **shadcn/ui**
- **React Router v7** (client-side routing)
- **Axios** (API calls → [Platzi Fake Store API](https://api.escuelajs.co/api/v1))
- **Playwright** (E2E tests)

## Installation

```bash
# Clone and install
pnpm install

# Add environment variable
echo "VITE_API_BASE_URL=https://api.escuelajs.co/api/v1/" > .env

# Start dev server
pnpm dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server at `localhost:5173` |
| `pnpm build` | Type-check and build for production |
| `pnpm test` | Run Playwright E2E tests |
| `pnpm test:ui` | Run tests with Playwright UI |
