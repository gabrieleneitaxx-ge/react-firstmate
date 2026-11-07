export default function Help() {
  return (
    <div>
      <h3 className="ws-sub" style={{ marginTop: 0 }}>How FirstMate works</h3>
      <ul className="ws-list">
        <li><span><strong>Overview</strong> — your daily briefing: open and overdue tasks, today's meetings, upcoming bookings and latest notes.</span></li>
        <li><span><strong>Tasks</strong> — things to do and reminders, with optional due dates. Overdue items turn red.</span></li>
        <li><span><strong>Calendar</strong> — connect Google Calendar to see upcoming events and schedule meetings. It warns you about clashes.</span></li>
        <li><span><strong>Notes</strong> — records, call notes and preferences, with tags and search.</span></li>
        <li><span><strong>Minutes</strong> — record meetings and turn action items into tasks with one click.</span></li>
        <li><span><strong>Bookings</strong> — flights, trains, hotels and reservations with a status for each.</span></li>
      </ul>
      <h3 className="ws-sub">Where your data lives</h3>
      <p>Tasks, notes, minutes, bookings and your profile are saved in this browser on this device only. They are not sent to a server, and they will not appear on another device or browser. Clearing your browser data also removes them.</p>
      <p>Calendar events stay in your Google account.</p>
    </div>
  );
}