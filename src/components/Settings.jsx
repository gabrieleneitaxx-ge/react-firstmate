import { useState } from 'react';

const KEYS = ['fm.tasks', 'fm.notes', 'fm.bookings', 'fm.minutes'];

export default function Settings() {
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [alsoProfile, setAlsoProfile] = useState(false);

  const clearAll = () => {
    try {
      KEYS.forEach((k) => localStorage.removeItem(k));
      if (alsoProfile) localStorage.removeItem('fm.profile');
    } catch {
      // Storage blocked: nothing to clear.
    }
    setConfirming(false);
    setCleared(true);
  };

  return (
    <div>
      <h3 className="ws-sub" style={{ marginTop: 0 }}>Clear my data</h3>
      <p>
        This permanently deletes all saved tasks, notes, minutes and bookings from this browser. It cannot be undone.
        Your Google Calendar is not affected.
      </p>
      <label className="ws-row" style={{ marginBottom: '.75rem' }}>
        <input
          type="checkbox"
          checked={alsoProfile}
          onChange={(e) => {
            setAlsoProfile(e.target.checked);
            setConfirming(false);
          }}
        />
        <span>Also clear my profile (name, role and who I support)</span>
      </label>
      {!confirming && <button type="button" onClick={() => { setCleared(false); setConfirming(true); }}>Clear my data</button>}
      {confirming && (
        <div className="ws-warn" role="alert">
          <span>Are you sure? Everything saved{alsoProfile ? ', including your profile,' : ''} will be deleted.</span>
          <button type="button" onClick={clearAll}>Yes, delete everything</button>
          <button type="button" className="ws-link" onClick={() => setConfirming(false)}>Cancel</button>
        </div>
      )}
      {cleared && <p className="ws-ok" role="status">All saved data has been cleared.</p>}
    </div>
  );
}