# Premium Freelance Portfolio - Avate Divya Mahesh

A premium, modern, high-conversion developer portfolio with a React + Tailwind + Framer Motion frontend and an Express backend contact API.

## Features

- Dark premium UI with glassmorphism cards and gradient animated background
- Sticky responsive navbar with smooth-scroll navigation
- High-conversion hero and service sections
- Animated sections and hover interactions
- Case-study style projects section
- Testimonials and achievements
- Contact form connected to backend email API
- WhatsApp CTA button for quick client conversion
- GitHub API integration to auto-fetch latest repositories
- Dark/light mode toggle
- SEO meta tags and clean folder structure

## Project Structure

```txt
frontend/   # React + Vite + Tailwind + Framer Motion
backend/    # Node.js + Express contact API
```

## Local Setup

### 1) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 2) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`

Set frontend API endpoint in `frontend/.env`:

```bash
VITE_API_URL=http://localhost:5000/api/contact
```

## Deploy

### Frontend on Vercel

1. Import `frontend` directory as a Vercel project.
2. Set environment variable:
   - `VITE_API_URL=https://<your-render-backend>/api/contact`
3. Deploy.

### Backend on Render

1. Create new Web Service from `backend` directory.
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Set env vars from `.env.example`.
5. Copy Render URL and use it in frontend `VITE_API_URL`.

## Notes

- Replace placeholder GitHub/demo links in project cards.
- Replace GitHub username in `useGithubRepos` hook if needed.
- SMTP settings are required for real email delivery.
