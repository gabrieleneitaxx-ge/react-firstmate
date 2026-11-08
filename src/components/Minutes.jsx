import { useState } from 'react';
import { useLocalStorage } from '../lib/useLocalStorage';

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Adds tasks straight into the Tasks list stored in this browser.
const addToTasks = (titles) => {
  let current = [];
  try {
    const v = JSON.parse(localStorage.getItem('fm.tasks'));
    if (Array.isArray(v)) current = v;
  } catch {
    // Start a fresh list if the stored one is unreadable.
  }
  const fresh = titles.map((title) => ({ id: crypto.randomUUID(), title, due: '', done: false }));
  localStorage.setItem('fm.tasks', JSON.stringify([...fresh, ...current]));
};

export default function Minutes() {
  const [minutes, setMinutes] = useLocalStorage('fm.minutes', []);
  const [form, setForm] = useState({ title: '', date: todayStr(), attendees: '', discussion: '', actions: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const add = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const actions = form.actions
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean)
      .map((text) => ({ id: crypto.randomUUID(), text, sent: false }));
    setMinutes([
      {
        id: crypto.randomUUID(),
        title: form.title.trim(),
        date: form.date,
        attendees: form.attendees.trim(),
        discussion: form.discussion.trim(),
        actions,
        created: new Date().toISOString(),
      },
      ...minutes,
    ]);
    setForm({ title: '', date: todayStr(), attendees: '', discussion: '', actions: '' });
  };

  const remove = (id) => setMinutes(minutes.filter((m) => m.id !== id));

  const sendActions = (minuteId, actionIds) => {
    const m = minutes.find((x) => x.id === minuteId);
    const chosen = m.actions.filter((a) => actionIds.includes(a.id) && !a.sent);
    if (!chosen.length) return;
    addToTasks(chosen.map((a) => a.text));
    setMinutes(
      minutes.map((x) =>
        x.id === minuteId ? { ...x, actions: x.actions.map((a) => (actionIds.includes(a.id) ? { ...a, sent: true } : a)) } : x
      )
    );
  };

  return (
    <div>
      <form onSubmit={add} className="ws-form ws-stack">
        <input value={form.title} onChange={set('title')} placeholder="Meeting title" aria-label="Meeting title" />
        <div className="ws-form" style={{ marginBottom: 0 }}>
          <input type="date" value={form.date} onChange={set('date')} aria-label="Meeting date" />
          <input value={form.attendees} onChange={set('attendees')} placeholder="Attendees (comma separated)" aria-label="Attendees" />
        </div>
        <textarea value={form.discussion} onChange={set('discussion')} placeholder="What was discussed and decided..." rows={4} aria-label="Discussion" />
        <textarea value={form.actions} onChange={set('actions')} placeholder="Action items, one per line" rows={3} aria-label="Action items" />
        <div><button type="submit">Save minutes</button></div>
      </form>

      {minutes.length === 0 && <p className="ws-empty">No minutes yet. Record a meeting above.</p>}
      <ul className="ws-list ws-cards">
        {minutes.map((m) => {
          const pending = m.actions.filter((a) => !a.sent);
          return (
            <li key={m.id}>
              <div className="ws-card-head">
                <strong>{m.title}</strong>
                <span className="ws-tag">{m.date}</span>
              </div>
              {m.attendees && <p className="ws-meta" style={{ margin: '.25rem 0' }}>Attendees: {m.attendees}</p>}
              {m.discussion && <p className="ws-pre">{m.discussion}</p>}
              {m.actions.length > 0 && (
                <>
                  <h4 className="ws-sub" style={{ margin: '.5rem 0 .25rem' }}>Action items</h4>
                  <ul className="ws-list">
                    {m.actions.map((a) => (
                      <li key={a.id}>
                        <span className="ws-grow">{a.text}</span>
                        {a.sent ? (
                          <span className="ws-tag">In Tasks</span>
                        ) : (
                          <button type="button" className="ws-link" onClick={() => sendActions(m.id, [a.id])}>Add to tasks</button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div className="ws-card-foot">
                {pending.length > 1 ? (
                  <button type="button" className="ws-link" onClick={() => sendActions(m.id, pending.map((a) => a.id))}>
                    Add all {pending.length} to tasks
                  </button>
                ) : <span />}
                <button type="button" className="ws-link" onClick={() => remove(m.id)} aria-label={`Delete ${m.title}`}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}