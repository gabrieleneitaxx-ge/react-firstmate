import { useState } from 'react';
import { useLocalStorage } from '../lib/useLocalStorage';

export default function Notes() {
  const [notes, setNotes] = useLocalStorage('fm.notes', []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState('');
  const [query, setQuery] = useState('');

  const add = (e) => {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;
    setNotes([
      { id: crypto.randomUUID(), title: title.trim() || 'Untitled', body: body.trim(), tag: tag.trim(), created: new Date().toISOString() },
      ...notes,
    ]);
    setTitle('');
    setBody('');
    setTag('');
  };
  const remove = (id) => setNotes(notes.filter((n) => n.id !== id));

  const q = query.trim().toLowerCase();
  const shown = notes.filter((n) => !q || `${n.title} ${n.body} ${n.tag}`.toLowerCase().includes(q));

  return (
    <div>
      <form className="ws-form ws-stack" onSubmit={add}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (client, topic...)" aria-label="Note title" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Record details, call notes, preferences..." rows={3} aria-label="Note body" />
        <div className="ws-row">
          <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag (optional)" aria-label="Tag" />
          <button type="submit">Save note</button>
        </div>
      </form>
      <input className="ws-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes" aria-label="Search notes" />
      {shown.length === 0 && <p className="ws-empty">{notes.length ? 'No matches.' : 'No notes yet.'}</p>}
      <ul className="ws-list ws-cards">
        {shown.map((n) => (
          <li key={n.id}>
            <div className="ws-card-head">
              <strong>{n.title}</strong>
              {n.tag && <span className="ws-tag">{n.tag}</span>}
            </div>
            {n.body && <p className="ws-pre">{n.body}</p>}
            <div className="ws-card-foot">
              <small>{new Date(n.created).toLocaleString()}</small>
              <button className="ws-link" onClick={() => remove(n.id)} aria-label={`Delete ${n.title}`}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
