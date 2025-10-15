# Copilot Instructions for rahulladumor-frontend

## Big Picture Architecture
- Next.js (React) SPA for portfolio, styled with Tailwind CSS.
- Personal info and config centralized in `config/personalInfo.js` and `.env` variables.
- Pages in `pages/` are route-based; main sections: about, booking, contact, reviews, services, index.
- UI components in `components/` (including landing page sections and reusable UI).
- Redux Toolkit for state management (`redux/`), with features and common slices.
- API integration via Axios, backend URL from `.env`.

## Developer Workflows
- **Install:** `npm install`
- **Run Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Start Prod Server:** `npm start`
- **Lint:** `npm run lint`
- **Type Check:** `npm run type-check`
- **Test:** `npm run test` (Vitest)
- **Validate Content:** `npm run validate` (checks for placeholders in config and SEO)
- **Setup Check:** `npm run setup-check` (validate + type-check)

## Project-Specific Conventions
- All personal info and social links must be updated in `config/personalInfo.js` and `.env`.
- SEO and Open Graph tags managed in `components/SEOHead.jsx`—replace all `[YOUR ...]` placeholders before deploy.
- Use Tailwind utility classes for styling; custom styles in `styles/globals.css`.
- All API calls use the backend URL from `.env` (`NEXT_PUBLIC_BACKEND_API_URL`).
- Redux store setup in `redux/store.js`.
- Content validation script (`scripts/validate-content.js`) must pass before production deploy.
- Add new pages to `pages/`, new UI to `components/ui/`.

## Integration Points & Dependencies
- Backend API: configure URL in `.env`, use Axios for requests.
- Calendly integration: set `NEXT_PUBLIC_CALENDLY_URL` in `.env`.
- Redux Toolkit for state, Tailwind for styling, Vitest for tests.
- SEO: update `SEOHead.jsx` and `.env` for correct meta tags.

## Examples & Patterns
- To add a new section: create a component in `components/`, add a page in `pages/`, update config if needed.
- To validate content: run `npm run validate` and fix any reported placeholders.
- To add new API calls: use Axios, import backend URL from `.env`.

## Key Files & Directories
- `config/personalInfo.js` — Centralized personal info
- `components/SEOHead.jsx` — SEO/meta tags
- `pages/` — Route-based pages
- `redux/` — State management
- `scripts/validate-content.js` — Content validation
- `.env.example` — Environment variable template

---
If any conventions or workflows are unclear, ask for clarification or examples from the codebase. Always run validation before deploying.
