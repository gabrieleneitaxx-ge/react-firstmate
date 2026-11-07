import { useState } from 'react';
import { useLocalStorage } from '../lib/useLocalStorage';

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage('fm.tasks', []);
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  const add = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    setTasks([{ id: crypto.randomUUID(), title: t, due, done: false }, ...tasks]);
    setTitle('');
    setDue('');
  };
  const toggle = (id) => setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const sorted = [...tasks].sort(
    (a, b) => Number(a.done) - Number(b.done) || (a.due || '9999').localeCompare(b.due || '9999')
  );
  const open = tasks.filter((t) => !t.done).length;

  return (
    <div>
      <form className="ws-form" onSubmit={add}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task or reminder" aria-label="Task title" />
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} aria-label="Due date" />
        <button type="submit">Add</button>
      </form>
      <p className="ws-meta">{open} open · {tasks.length - open} done</p>
      {sorted.length === 0 && <p className="ws-empty">No tasks yet.</p>}
      <ul className="ws-list">
        {sorted.map((t) => (
          <li key={t.id} className={t.done ? 'done' : ''}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              <span>{t.title}</span>
            </label>
            {t.due && (
              <span className={`ws-tag ${!t.done && t.due < today ? 'overdue' : ''}`}>
                {!t.done && t.due < today ? 'Overdue · ' : ''}{t.due}
              </span>
            )}
            <button className="ws-link" onClick={() => remove(t.id)} aria-label={`Delete ${t.title}`}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
