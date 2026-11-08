import { useState } from 'react';
import { useLocalStorage } from '../lib/useLocalStorage';

const TYPES = ['Flight', 'Train', 'Hotel', 'Restaurant', 'Other'];
const STATUSES = ['To book', 'Booked', 'Cancelled'];

export default function Bookings() {
  const [items, setItems] = useLocalStorage('fm.bookings', []);
  const [form, setForm] = useState({ type: TYPES[0], title: '', date: '', ref: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const add = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setItems([{ id: crypto.randomUUID(), ...form, title: form.title.trim(), ref: form.ref.trim(), status: STATUSES[0] }, ...items]);
    setForm({ type: form.type, title: '', date: '', ref: '' });
  };
  const setStatus = (id, status) => setItems(items.map((i) => (i.id === id ? { ...i, status } : i)));
  const remove = (id) => setItems(items.filter((i) => i.id !== id));
  const sorted = [...items].sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));

  return (
    <div>
      <p className="ws-meta">Track tickets and reservations. This records them; it does not purchase anything.</p>
      <form className="ws-form" onSubmit={add}>
        <select value={form.type} onChange={set('type')} aria-label="Type">
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <input value={form.title} onChange={set('title')} placeholder="e.g. LOS to ABV, 8:00" aria-label="Booking details" />
        <input type="date" value={form.date} onChange={set('date')} aria-label="Date" />
        <input value={form.ref} onChange={set('ref')} placeholder="Confirmation ref" aria-label="Confirmation reference" />
        <button type="submit">Add</button>
      </form>
      {sorted.length === 0 && <p className="ws-empty">No bookings yet.</p>}
      <ul className="ws-list">
        {sorted.map((i) => (
          <li key={i.id}>
            <span className="ws-tag">{i.type}</span>
            <span className="ws-grow">{i.title}{i.date && ` · ${i.date}`}{i.ref && ` · Ref ${i.ref}`}</span>
            <select value={i.status} onChange={(e) => setStatus(i.id, e.target.value)} aria-label={`Status of ${i.title}`}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <button className="ws-link" onClick={() => remove(i.id)} aria-label={`Delete ${i.title}`}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
