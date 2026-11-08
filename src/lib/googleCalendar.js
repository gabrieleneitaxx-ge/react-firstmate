// Google Calendar via Google Identity Services (token flow) + Calendar REST API.
// Browser-only: needs a public OAuth Client ID, never a client secret.
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPE = 'https://www.googleapis.com/auth/calendar.events';
const API = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

let accessToken = null;
let expiresAt = 0;

export const isConfigured = Boolean(CLIENT_ID);
export const isConnected = () => Boolean(accessToken) && Date.now() < expiresAt;

function loadScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) return resolve();
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Could not load Google sign-in.'));
    document.head.appendChild(s);
  });
}

export async function connect() {
  if (!isConfigured) throw new Error('VITE_GOOGLE_CLIENT_ID is not set.');
  await loadScript();
  return new Promise((resolve, reject) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      callback: (resp) => {
        if (resp.error) return reject(new Error(resp.error));
        accessToken = resp.access_token;
        expiresAt = Date.now() + Number(resp.expires_in) * 1000 - 30000;
        resolve();
      },
      error_callback: (err) => reject(new Error(err?.type || 'Sign-in cancelled.')),
    });
    client.requestAccessToken();
  });
}

export function disconnect() {
  if (accessToken) window.google?.accounts?.oauth2?.revoke(accessToken, () => {});
  accessToken = null;
  expiresAt = 0;
}

async function call(url, options = {}) {
  if (!isConnected()) throw new Error('Google Calendar session expired. Please reconnect.');
  const res = await fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error?.message || `Google Calendar error (${res.status}).`);
  }
  return res.status === 204 ? null : res.json();
}

export async function listEvents(timeMin, timeMax, maxResults = 10) {
  const params = new URLSearchParams({
    timeMin: new Date(timeMin).toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: String(maxResults),
  });
  if (timeMax) params.set('timeMax', new Date(timeMax).toISOString());
  const data = await call(`${API}?${params}`);
  return data.items || [];
}

export function createEvent({ summary, start, end, attendees = [], location = '' }) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const body = {
    summary,
    location,
    start: { dateTime: new Date(start).toISOString(), timeZone },
    end: { dateTime: new Date(end).toISOString(), timeZone },
    attendees: attendees.map((email) => ({ email })),
  };
  // sendUpdates=all emails invitations to attendees.
  return call(`${API}?sendUpdates=all`, { method: 'POST', body: JSON.stringify(body) });
}

export function deleteEvent(id) {
  return call(`${API}/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
