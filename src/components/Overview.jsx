import { useState, useEffect } from 'react';
import { isConfigured, isConnected, listEvents } from '../lib/googleCalendar';

// Read-only snapshot of what is stored in this browser.
const read = (key) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const readProfile = () => {
  try {
    return JSON.parse(localStorage.getItem('fm.profile')) || {};
  } catch {
    return {};
  }
};

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};

const eventTime = (ev) =>
  ev.start?.dateTime
    ? new Date(ev.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'All day';

export default function Overview() {
  const [tasks] = useState(() => read('fm.tasks'));
  const [bookings] = useState(() => read('fm.bookings'));
  const [notes] = useState(() => read('fm.notes'));
  const [name] = useState(() => (readProfile().name || '').trim());
  const [events, setEvents] = useState([]);
  const [calError, setCalError] = useState('');
  const today = localToday();

  useEffect(() => {
    if (!isConfigured || !isConnected()) return;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    listEvents(start, end, 10).then(setEvents).catch((e) => setCalError(e.message));
  }, []);

  const open = tasks.filter((t) => !t.done);
  const overdue = open.filter((t) => t.due && t.due < today);
  const dueToday = open.filter((t) => t.due === today);
  const upcoming = bookings
    .filter((b) => b.status !== 'Cancelled' && (!b.date || b.date >= today))
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'))
    .slice(0, 5);
  const latestNotes = [...notes].sort((a, b) => (b.created || '').localeCompare(a.created || '')).slice(0, 3);

  return (
    <div>
      <h3 className="ws-sub" style={{ marginTop: 0 }}>
        {greeting()}{name ? `, ${name}` : ''} · {new Date().toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
      </h3>

      <div className="ov-stats">
        <a href="#tasks" className="ov-stat"><strong>{open.length}</strong><span>Open tasks</span></a>
        <a href="#tasks" className={`ov-stat ${overdue.length ? 'warn' : ''}`}><strong>{overdue.length}</strong><span>Overdue</span></a>
        <a href="#tasks" className="ov-stat"><strong>{dueToday.length}</strong><span>Due today</span></a>
        <a href="#bookings" className="ov-stat"><strong>{upcoming.length}</strong><span>Upcoming bookings</span></a>
      </div>

      <h3 className="ws-sub">Today's meetings</h3>
      {!isConfigured && <p className="ws-empty">Google Calendar is not set up yet, so meetings are not shown. <a href="#calendar">Open Calendar</a></p>}
      {isConfigured && !isConnected() && <p className="ws-empty">Connect Google Calendar to see today's meetings here. <a href="#calendar">Open Calendar</a></p>}
      {calError && <p className="ws-error">{calError}</p>}
      {isConfigured && isConnected() && !calError && events.length === 0 && <p className="ws-empty">No meetings today.</p>}
      <ul className="ws-list">
        {events.map((ev) => (
          <li key={ev.id}><span className="ws-tag">{eventTime(ev)}</span><span className="ws-grow">{ev.summary || '(no title)'}</span></li>
        ))}
      </ul>

      <h3 className="ws-sub">Tasks needing attention</h3>
      {overdue.length + dueToday.length === 0 && <p className="ws-empty">Nothing overdue or due today.</p>}
      <ul className="ws-list">
        {[...overdue, ...dueToday].slice(0, 5).map((t) => (
          <li key={t.id}>
            <span className="ws-grow">{t.title}</span>
            <span className={`ws-tag ${t.due < today ? 'overdue' : ''}`}>{t.due < today ? 'Overdue · ' : 'Today · '}{t.due}</span>
          </li>
        ))}
      </ul>

      <h3 className="ws-sub">Upcoming bookings</h3>
      {upcoming.length === 0 && <p className="ws-empty">No upcoming bookings. <a href="#bookings">Add one</a></p>}
      <ul className="ws-list">
        {upcoming.map((b) => (
          <li key={b.id}>
            <span className="ws-grow">{b.title}{b.date && ` · ${b.date}`}</span>
            <span className="ws-tag">{b.status}</span>
          </li>
        ))}
      </ul>

      <h3 className="ws-sub">Latest notes</h3>
      {latestNotes.length === 0 && <p className="ws-empty">No notes yet. <a href="#notes">Add one</a></p>}
      <ul className="ws-list">
        {latestNotes.map((n) => (
          <li key={n.id}><span className="ws-grow"><strong>{n.title}</strong></span>{n.tag && <span className="ws-tag">{n.tag}</span>}</li>
        ))}
      </ul>
    </div>
  );
}