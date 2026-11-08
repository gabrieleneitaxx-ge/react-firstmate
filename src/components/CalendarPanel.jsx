import { useState, useEffect, useCallback } from 'react';
import { isConfigured, isConnected, connect, disconnect, listEvents, createEvent, deleteEvent } from '../lib/googleCalendar';

const fmt = (ev) => {
  const s = ev.start?.dateTime || ev.start?.date;
  return ev.start?.dateTime ? new Date(s).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : `${s} (all day)`;
};

export default function CalendarPanel() {
  const [connected, setConnected] = useState(isConnected());
  const [events, setEvents] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [conflicts, setConflicts] = useState([]);
  const [form, setForm] = useState({ summary: '', start: '', minutes: '30', attendees: '', location: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const run = useCallback(async (fn) => {
    setBusy(true);
    setError('');
    try {
      return await fn();
    } catch (err) {
      setError(err.message);
      if (!isConnected()) setConnected(false);
    } finally {
      setBusy(false);
    }
  }, []);

  const refresh = useCallback(() => run(async () => setEvents(await listEvents(new Date()))), [run]);

  useEffect(() => {
    if (connected) refresh();
  }, [connected, refresh]);

  const onConnect = () => run(async () => {
    await connect();
    setConnected(true);
  });
  const onDisconnect = () => {
    disconnect();
    setConnected(false);
    setEvents([]);
  };

  const schedule = (force) => run(async () => {
    setNotice('');
    const start = new Date(form.start);
    const end = new Date(start.getTime() + Number(form.minutes) * 60000);
    if (!force) {
      const clash = await listEvents(start, end, 5);
      if (clash.length) return setConflicts(clash);
    }
    const emails = form.attendees.split(',').map((a) => a.trim()).filter(Boolean);
    const bad = emails.find((a) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a));
    if (bad) throw new Error(`"${bad}" is not a valid email address.`);
    await createEvent({ summary: form.summary.trim(), start, end, attendees: emails, location: form.location.trim() });
    setConflicts([]);
    setForm({ summary: '', start: '', minutes: '30', attendees: '', location: '' });
    setNotice(emails.length ? 'Meeting scheduled and invitations sent.' : 'Meeting scheduled.');
    setEvents(await listEvents(new Date()));
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.summary.trim() && form.start) schedule(false);
  };
  const onDelete = (id) => run(async () => {
    await deleteEvent(id);
    setEvents(await listEvents(new Date()));
  });

  if (!isConfigured) {
    return (
      <p className="ws-empty">
        Google Calendar is not configured. Set <code>VITE_GOOGLE_CLIENT_ID</code> in a local <code>.env</code> file (see README), then restart the dev server.
      </p>
    );
  }
  if (!connected) {
    return (
      <div>
        <p className="ws-meta">Connect your Google account to view upcoming events and schedule meetings.</p>
        <button onClick={onConnect} disabled={busy}>{busy ? 'Connecting...' : 'Connect Google Calendar'}</button>
        {error && <p className="ws-error" role="alert">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <div className="ws-row">
        <p className="ws-meta ws-grow">Connected to Google Calendar</p>
        <button className="ws-link" onClick={refresh} disabled={busy}>Refresh</button>
        <button className="ws-link" onClick={onDisconnect}>Disconnect</button>
      </div>
      <form className="ws-form ws-stack" onSubmit={onSubmit}>
        <input value={form.summary} onChange={set('summary')} placeholder="Meeting title" aria-label="Meeting title" required />
        <div className="ws-row">
          <input type="datetime-local" value={form.start} onChange={set('start')} aria-label="Start" required />
          <select value={form.minutes} onChange={set('minutes')} aria-label="Duration">
            {['15', '30', '45', '60', '90', '120'].map((m) => <option key={m} value={m}>{m} min</option>)}
          </select>
        </div>
        <input value={form.attendees} onChange={set('attendees')} placeholder="Attendee emails, comma separated (optional)" aria-label="Attendees" />
        <input value={form.location} onChange={set('location')} placeholder="Location or link (optional)" aria-label="Location" />
        <button type="submit" disabled={busy}>Schedule meeting</button>
      </form>
      {conflicts.length > 0 && (
        <div className="ws-warn" role="alert">
          <strong>Conflict:</strong> you already have {conflicts.map((c) => c.summary || '(no title)').join(', ')} in that slot.
          <button onClick={() => schedule(true)} disabled={busy}>Schedule anyway</button>
          <button className="ws-link" onClick={() => setConflicts([])}>Cancel</button>
        </div>
      )}
      {error && <p className="ws-error" role="alert">{error}</p>}
      {notice && <p className="ws-ok">{notice}</p>}
      <h3 className="ws-sub">Upcoming</h3>
      {events.length === 0 && <p className="ws-empty">Nothing upcoming.</p>}
      <ul className="ws-list">
        {events.map((ev) => (
          <li key={ev.id}>
            <span className="ws-grow"><strong>{ev.summary || '(no title)'}</strong> · {fmt(ev)}</span>
            <button className="ws-link" onClick={() => onDelete(ev.id)} disabled={busy} aria-label={`Delete ${ev.summary || 'event'}`}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
