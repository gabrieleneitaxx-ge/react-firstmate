# FirstMate: the Assistant's Assistant

React + Vite app that helps a personal assistant with daily routines.

## Features
- **Tasks & reminders**: add, complete, delete, due dates, overdue highlighting.
- **Notes / records**: titled notes with tags and search.
- **Bookings**: log flights, trains, hotels and restaurants with date, confirmation ref and status. (Records only; it does not purchase.)
- **Calendar (Google)**: connect, view upcoming events, schedule meetings with attendee invites, conflict warning, delete events.
- Tasks, notes and bookings are stored in the browser's localStorage (this device only). There is no backend yet.
- The "Chat With FirstMate" box is still a scripted demo, not a real assistant.

## Setup
```bash
npm install
cp .env.example .env     # then set VITE_GOOGLE_CLIENT_ID
npm run dev
npm run lint
npm run build
```

## Google Calendar setup
1. Google Cloud Console: create a project and enable **Google Calendar API**.
2. Configure the OAuth consent screen (add yourself as a test user while in Testing mode).
3. Create an **OAuth client ID** of type *Web application*. Add `http://localhost:5173` (and your deployed URL) under *Authorized JavaScript origins*.
4. Put the client ID in `.env` as `VITE_GOOGLE_CLIENT_ID`. No client secret is used or needed.
5. Scope requested: `calendar.events`. Access tokens are kept in memory only and expire after about an hour; use Connect again when asked.

Never commit `.env` (it is git-ignored). On Vercel, set `VITE_GOOGLE_CLIENT_ID` in Project Settings, Environment Variables.
