import { useState, useEffect } from 'react';
import Overview from './Overview';
import Tasks from './Tasks';
import CalendarPanel from './CalendarPanel';
import Notes from './Notes';
import Minutes from './Minutes';
import Bookings from './Bookings';
import Profile from './Profile';
import Help from './Help';
import Settings from './Settings';
import './Workspace.css';

// hidden tabs open from the navbar menu only and do not get a button in the tab row.
const TABS = [
  { id: 'overview', label: 'Overview', Panel: Overview },
  { id: 'tasks', label: 'Tasks', Panel: Tasks },
  { id: 'calendar', label: 'Calendar', Panel: CalendarPanel },
  { id: 'notes', label: 'Notes', Panel: Notes },
  { id: 'minutes', label: 'Minutes', Panel: Minutes },
  { id: 'bookings', label: 'Bookings', Panel: Bookings },
  { id: 'profile', label: 'Profile', Panel: Profile, hidden: true },
  { id: 'help', label: 'Help', Panel: Help, hidden: true },
  { id: 'settings', label: 'Clear my data', Panel: Settings, hidden: true },
];

const tabFromHash = () => {
  const h = window.location.hash.slice(1);
  return TABS.some((t) => t.id === h) ? h : null;
};

export default function Workspace() {
  const [tab, setTab] = useState(tabFromHash() ?? 'overview');

  // Navbar links like #calendar switch tabs and scroll to the workspace.
  useEffect(() => {
    const onHash = () => {
      const t = tabFromHash();
      if (!t) return;
      setTab(t);
      setTimeout(() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' }), 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const { Panel, label } = TABS.find((t) => t.id === tab);
  const current = TABS.find((t) => t.id === tab);

  return (
    <section id="workspace" className="ws-section">
      <div className="ws-wrap">
        <h2>Your Workspace</h2>
        <div className="ws-tabs" role="tablist">
          {TABS.filter((t) => !t.hidden).map((t) => (
            <button key={t.id} role="tab" aria-selected={t.id === tab} className={t.id === tab ? 'active' : ''} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="ws-panel" role="tabpanel" aria-label={label}>
          {current.hidden && (
            <button type="button" className="ws-link" onClick={() => setTab('overview')}>← Back to Overview</button>
          )}
          <Panel />
        </div>
        <p className="ws-meta">Tasks, notes and bookings are saved in this browser only. Calendar data stays in your Google account.</p>
      </div>
    </section>
  );
}