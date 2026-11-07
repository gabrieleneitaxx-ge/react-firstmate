import { useState } from 'react';
import { useLocalStorage } from '../lib/useLocalStorage';

export default function Profile() {
  const [profile, setProfile] = useLocalStorage('fm.profile', { name: '', role: '', principal: '' });
  const [saved, setSaved] = useState(false);
  const set = (k) => (e) => {
    setSaved(false);
    setProfile({ ...profile, [k]: e.target.value });
  };

  return (
    <div>
      <h3 className="ws-sub" style={{ marginTop: 0 }}>Your profile</h3>
      <p className="ws-meta">Saved in this browser only. Your name is used to greet you on the Overview.</p>
      <form
        className="ws-form ws-stack"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <input value={profile.name} onChange={set('name')} placeholder="Your name" aria-label="Your name" />
        <input value={profile.role} onChange={set('role')} placeholder="Your role (e.g. Personal Assistant)" aria-label="Your role" />
        <input value={profile.principal} onChange={set('principal')} placeholder="Who you support (name or title)" aria-label="Who you support" />
        <div>
          <button type="submit">Save profile</button>
          {saved && <span className="ws-ok" role="status"> Saved.</span>}
        </div>
      </form>
    </div>
  );
}