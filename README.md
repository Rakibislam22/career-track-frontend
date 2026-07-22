# CareerTrack Lite — Frontend

The React frontend for CareerTrack Lite, a job application tracking system. Connects to the [CareerTrack Lite backend API](https://github.com/Rakibislam22/career-track-backend) to provide registration, login, a dashboard, and full CRUD for job applications.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Routing](#routing)
- [Design System](#design-system)
- [Key Implementation Notes](#key-implementation-notes)
- [Deployment](#deployment)
- [AI Tools Used](#ai-tools-used)
- [Challenges & Known Limitations](#challenges--known-limitations)
- [Future Improvements](#future-improvements)

---

## Features

- Landing page with product overview and pipeline showcase
- Register / login with client-side validation and inline error handling
- Protected routes — unauthenticated users are redirected to `/login`, with a loading state during token verification so refreshing never flashes the login page before the dashboard loads
- Dashboard with statistic cards (total, saved, applied, assessment, interview, rejected, offer), a Recharts bar chart of the pipeline, and a recently-added applications list
- All Applications page with search, status/source filters, and newest/oldest sorting
- Add / Edit application form (shared component, mode detected from the URL)
- Application details page with edit and delete actions
- Delete confirmation via SweetAlert2, styled to match the app's dark theme
- Cold-start notice while the Render backend wakes up from idle
- Custom 404 page
- Responsive layout with a collapsible sidebar (daisyUI drawer)

---

## Tech Stack

| Layer          | Technology                        |
|----------------|-------------------------------------|
| Language       | JavaScript (JSX)                    |
| Build tool     | Vite                                |
| UI framework   | React                               |
| Styling        | Tailwind CSS v4 + daisyUI           |
| Routing        | React Router                        |
| Charts         | Recharts                            |
| Alerts/Confirm | SweetAlert2                         |
| Icons          | lucide-react                        |
| Deployment     | Vercel                              |

---

## Project Structure

```
career-track-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                 # Public navbar (landing page)
│   │   ├── DashboardNavbar.jsx        # Authenticated navbar with avatar dropdown
│   │   ├── DashboardLayout.jsx        # Sidebar + navbar shell, renders <Outlet />
│   │   ├── AuthLayout.jsx             # Shared shell for login/register
│   │   ├── ApplicationForm.jsx        # Shared form for create + edit
│   │   ├── StatCard.jsx               # Single dashboard stat tile
│   │   ├── ColdStartNotice.jsx        # Render free-tier wake-up warning
│   │   ├── Loading.jsx                # Full-screen loading spinner
│   │   └── PrivateRoute.jsx           # Route guard — verifies token via /auth/me
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ApplicationsPage.jsx
│   │   ├── ApplicationFormPage.jsx    # Handles both /new and /:id/edit
│   │   ├── ApplicationDetailsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── lib/
│   │   ├── apiClient.js               # Fetch wrapper, attaches JWT automatically
│   │   └── constants.js               # Status/source enums, labels, badge classes
│   ├── App.jsx                        # Route definitions
│   ├── main.jsx                       # App entry point
│   └── index.css                      # Tailwind + daisyUI theme, global overrides
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm
- The [backend API](https://github.com/Rakibislam22/career-track-backend) running locally or deployed

### Installation

```bash
git clone <repository-url>
cd career-track-frontend
npm install
```

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable       | Description                          | Example                                      |
|----------------|-----------------------------------------|-------------------------------------------------|
| `VITE_API_URL` | Base URL of the backend API (includes `/api`) | `http://localhost:5000/api` (dev) / `https://your-app.onrender.com/api` (prod) |

---

## Running the Project

### Development

```bash
npm run dev
```

Runs on `http://localhost:5173` by default.

### Production build

```bash
npm run build
npm run preview
```

---

## Routing

| Path                                  | Page                     | Access     |
|-----------------------------------------|----------------------------|--------------|
| `/`                                    | Landing page                | Public       |
| `/login`                               | Login                       | Public       |
| `/register`                            | Register                    | Public       |
| `/dashboard`                           | Dashboard (stats + chart)   | Protected    |
| `/dashboard/applications`              | All applications list       | Protected    |
| `/dashboard/applications/new`          | Add application             | Protected    |
| `/dashboard/applications/:id`          | Application details         | Protected    |
| `/dashboard/applications/:id/edit`     | Edit application            | Protected    |
| `*`                                    | 404 Not Found                | Public       |

All `/dashboard/*` routes are nested under `DashboardLayout` and wrapped by `PrivateRoute`, which:
1. Checks `localStorage` for a token
2. Verifies it against `GET /api/auth/me`
3. Shows a full-screen `Loading` state while verifying — so a page refresh never flashes the login page before redirecting or loading the dashboard
4. Clears an invalid/expired token and redirects to `/login` only after verification completes

---

## Design System

CareerTrack Lite uses a dark theme inspired by GitHub's UI, implemented as a custom daisyUI theme (`src/index.css`):

| Token         | Color       | Based on                          |
|---------------|-------------|--------------------------------------|
| `primary`     | `#238636`   | GitHub's Sign In / CTA green         |
| `secondary`   | `#0969da`   | GitHub's link/accent blue            |
| `accent`      | `#8250df`   | GitHub's "Done" purple (merged PRs)  |
| `success`     | `#1a7f37`   | GitHub green (checks passing)        |
| `warning`     | `#9a6700`   | GitHub amber (pending/attention)     |
| `error`       | `#cf222e`   | GitHub red (failing checks)          |

- **Background:** a single fixed gradient (`#081827 → #171e29 → #131416`) applied at the `body` level, so it stays continuous across every page instead of resetting per-section.
- **Cards:** `.glass-surface` — a subtle translucent surface with blur, used for dashboard cards, feature cards, and forms.
- **Dropdowns/popovers:** `.glass-solid` — a fully opaque dark surface, used anywhere text needs to stay readable over other content (e.g. the navbar's account dropdown).
- **Radius:** globally moderate rounding via daisyUI theme tokens (`--radius-field`, `--radius-box`, `--radius-selector`), so buttons, inputs, and cards stay consistent without per-component overrides.
- **Status badges:** consistently mapped in `src/lib/constants.js` — `SAVED` → neutral, `APPLIED` → info, `ASSESSMENT`/`INTERVIEW` → warning, `REJECTED` → error, `OFFER` → success.

---

## Key Implementation Notes

- **Shared form component:** `ApplicationForm` is used for both creating and editing applications. `ApplicationFormPage` detects mode from the presence of a `:id` URL param and passes the appropriate submit handler.
- **Centralized API client:** `src/lib/apiClient.js` wraps `fetch`, attaches the JWT from `localStorage` automatically, and throws on non-2xx responses so every page can use a simple `try/catch`.
- **Search & filtering:** `ApplicationsPage` debounces the search input (300ms) and rebuilds query params (`search`, `status`, `source`, `sort`) on every change, matching the backend's `GET /api/applications` query support.
- **Delete confirmation:** SweetAlert2 is themed to match the app (dark background, brand colors) via a shared `swalDarkTheme` object in `constants.js`, used identically in both the list and details pages.
- **Cold-start handling:** `DashboardPage` starts a 3-second timer on mount; if the `/dashboard/stats` request hasn't resolved by then, it shows a notice that the Render backend may be waking up from idle.

---

## Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com).
  - Framework preset: Vite
  - Environment variable: `VITE_API_URL` set to the deployed backend's `/api` URL
- **Backend:** See the [backend README](https://github.com/Rakibislam22/career-track-backend/README.md) for its Render deployment details.

**Live Links**
- Frontend: https://myjob-application.vercel.app/
- Backend/API: https://career-track-backend-n7i9.onrender.com/

---

## AI Tools Used

Claude, Windsurf, Gemini, and GitHub Copilot were used throughout development to:
- Scaffold the Vite + React + Tailwind + daisyUI project and set up a custom GitHub-inspired theme
- Build out the landing page, auth pages, and dashboard layout (drawer sidebar + nested routes)
- Debug daisyUI theming issues (`color-scheme` mismatch causing wrong computed colors, theme name collisions with daisyUI's built-in themes, transparent dropdown backgrounds)
- Implement the token-verification flow in `PrivateRoute` to avoid a login-page flash on page refresh

All generated code was reviewed, tested, and understood before being committed.

---

## Challenges & Known Limitations

- **daisyUI theme `color-scheme` mismatch:** An early version of the custom theme set `color-scheme: dark` while defining light base colors, which caused daisyUI to compute wrong content colors for `primary`/`secondary` (showing as blue/pink instead of the intended green/blue). Fixed by matching `color-scheme` to the actual palette.
- **Theme name collision:** Naming the custom theme `"light"` collided with daisyUI's built-in `light` theme, causing the built-in `dark` theme to override it under system dark mode. Fixed by giving the theme a unique name and explicitly restricting `themes` in the daisyUI plugin config.
- **Glass-effect readability:** The translucent `.glass-surface` style used for cards was too transparent for dropdowns and popovers, making menu text hard to read over scrolled page content. Resolved by introducing a separate, fully opaque `.glass-solid` style for those cases.
- **Login-page flash on refresh:** Initially, refreshing an authenticated session briefly rendered the login page before the dashboard, because token verification is asynchronous. Fixed by adding an explicit `isChecking` loading state to `PrivateRoute` that renders a spinner until the `/auth/me` check resolves, rather than defaulting to "logged out."
- **Render free-tier cold starts:** The first API request after backend inactivity can take 30–50 seconds; the dashboard shows a notice in that case rather than appearing to hang silently.

---

## Future Improvements

- Add pagination controls to the All Applications table for large datasets
- Add toast notifications for create/update actions (currently only delete has a confirmation flow)
- Optional AI integration: paste a job description on the Add Application form to auto-generate a summary and interview prep questions
- Add automated component/integration tests