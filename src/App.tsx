import { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";

function Icon({ name }: { name: string }) {
  return (
    <span className="material-symbols-outlined">
      {name}
    </span>
  );
}

type Page = "overview" | "activity" | "movement" | "alerts" | "notifications";
type AuthMode = "signin" | "signup";

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "dashboard" },
  { id: "activity", label: "Activity Monitor", icon: "monitor_heart" },
  { id: "movement", label: "Movement History", icon: "timeline" },
  { id: "alerts", label: "Alert History", icon: "warning" },
  { id: "notifications", label: "Notifications", icon: "notifications" },
];

function Logo() {
  return (
    <div className="logoBox">
      <img src={logo} alt="Logo" className="sidebarLogoImg" />
    </div>
  );
}


function AuthPage({
  mode,
  setMode,
  onLogin,
}: {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
  onLogin: () => void;
}) {
  const isSignup = mode === "signup";

  return (
    <main className="authPage">
      <section className="authCard">
      <div className="authLogo">
  <div className="bigLogo">
    <img src={logo} alt="Kolapse logo" />
  </div>
</div>

        <p className="authSubtitle">Monitor and protect with real-time alerts</p>

        <form className="authForm">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          {isSignup && (
            <>
              <label>Re-enter password</label>
              <input type="password" placeholder="Re-enter your password" />
            </>
          )}

          <div className="authOptions">
            <label className="checkboxText">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" className="linkButton">
              Forgot password?
            </button>
          </div>

          <button type="button" className="primaryButton" onClick={onLogin}>
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="switchText">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="linkButton"
            onClick={() => setMode(isSignup ? "signin" : "signup")}
          >
            {isSignup ? "Sign in" : "Sign up"}
          </button>
        </p>

        <p className="footerText">© 2026 Fall Detection System. All rights reserved.</p>
      </section>
    </main>
  );
}

function Sidebar({
  page,
  setPage,
  onLogout,
}: {
  page: Page;
  setPage: (page: Page) => void;
  onLogout: () => void;
}) {
  return (
    <aside className="sidebar">
      <Logo />

      <nav className="navList">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`navItem ${page === item.id ? "active" : ""}`}
            onClick={() => setPage(item.id)}
          >
            <Icon name={item.icon} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sideBottom">
        <button className="bottomButton">⚙ Settings</button>
        <button className="bottomButton logout" onClick={onLogout}>
          ↪ Logout
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <div></div>

      <div className="topActions">
        <button className="iconButton">
          <Icon name="notifications" />
        </button>

        <button className="userButton">
          <Icon name="person" />
        </button>
      </div>
    </header>
  );
}

function PageHeader({
  title,
  subtitle,
  showBack = false,
  setPage,
}: {
  title: string;
  subtitle: string;
  showBack?: boolean;
  setPage?: (page: Page) => void;
}) {
  return (
    <div className="pageHeader">
      {showBack && (
        <button className="backButton" onClick={() => setPage?.("overview")}>
          ← Back to Overview
        </button>
      )}
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  note,
  color,
}: {
  icon: string;
  title: string;
  value: string;
  note: string;
  color: "purple" | "teal" | "orange" | "mint";
}) {
  return (
    <article className={`statCard ${color}`}>
      <div className="statIcon">
  <Icon name={icon} />
</div>
      <p>{title}</p>
      <h2>{value}</h2>
      <small>{note}</small>
    </article>
  );
}

function CameraBox() {
  return (
    <div className="cameraBox">
      <Icon name="camera" />
    </div>
  );
}

function PatientStatus() {
  return (
    <div className="patientRow">
      <div className="avatar">NK</div>
      <div>
        <strong>Nika</strong>
        <span className="miniTag">Normal</span>
        <p>Living Room</p>
      </div>

      <div className="activityPill">▭ Sitting</div>
      <small>Updated Just now</small>
    </div>
  );
}

function ActivitySummary() {
  const items = [
    { label: "Standing", value: "1", icon: "♙" },
    { label: "Sitting", value: "1", icon: "▭" },
    { label: "Laying", value: "1", icon: "▱" },
    { label: "Walking", value: "1", icon: "⌁" },
  ];

  return (
    <div className="activitySummary">
      {items.map((item) => (
        <div key={item.label}>
          <div className="summaryIcon">{item.icon}</div>
          <p>{item.label}</p>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

function ActivityMonitorCard({ large = false }: { large?: boolean }) {
  return (
    <section className="card">
      <div className="cardHeader">
        <div>
          <h3>Real-Time Activity Monitor</h3>
          <p>Your current activity status</p>
        </div>
        <span className="liveDot">● Live</span>
      </div>

      <hr />

      <p className="sectionLabel">Live Camera</p>
      <CameraBox />

      <PatientStatus />

      <hr />

      <h4>Today&apos;s Activity Summary</h4>
      <ActivitySummary />
    </section>
  );
}

function TimelineCard() {
  const segments = [
    { width: "30%", className: "seg purple" },
    { width: "5%", className: "seg teal" },
    { width: "4%", className: "seg purple2" },
    { width: "5%", className: "seg teal" },
    { width: "4%", className: "seg orange" },
    { width: "6%", className: "seg purple" },
    { width: "7%", className: "seg teal" },
    { width: "15%", className: "seg purple" },
    { width: "12%", className: "seg teal" },
    { width: "12%", className: "seg purple" },
  ];

  return (
    <section className="card">
      <div className="cardHeader">
        <div>
          <h3>24-Hour Activity Timeline</h3>
          <p>Saturday, March 21, 2026</p>
        </div>
        <button className="smallPinkButton">View History →</button>
      </div>

      <div className="timelineLabels">
        <span>12am</span>
        <span>6am</span>
        <span>12pm</span>
        <span>6pm</span>
        <span>11pm</span>
      </div>

      <div className="timelineTrack">
        {segments.map((seg, index) => (
          <span key={index} className={seg.className} style={{ width: seg.width }} />
        ))}
      </div>

      <hr />

      <h4>Today&apos;s Summary</h4>
      <div className="summaryChips">
        <span><b className="dot purpleDot"></b>Sitting <strong>7h</strong></span>
        <span><b className="dot tealDot"></b>Standing <strong>2h</strong></span>
        <span><b className="dot tealDot"></b>Walking <strong>3h</strong></span>
        <span><b className="dot purpleDot"></b>Laying <strong>11h</strong></span>
        <span><b className="dot orangeDot"></b>Falling <strong>1h</strong></span>
      </div>
    </section>
  );
}

function ActiveAlertsCard() {
  return (
    <section className="card sideCard">
      <div className="cardHeader">
        <div>
          <h3>Active Alerts</h3>
          <p>1 active alert</p>
        </div>
        <span className="redDot">●</span>
      </div>

      <div className="alertBox">
        <span className="tagHigh">HIGH</span>
        <h4>⚠ Fall Detected</h4>
        <p>Nika</p>
        <p>09:42 AM</p>
        <p>Living Room</p>
        <small>Notifications sent:</small>
        <div className="notifyIcons">
        <Icon name="chat_bubble" />
        <Icon name="smartphone" />
        <Icon name="call" />
        </div>
        <button>View Details</button>
      </div>

      <hr />

      <h4>Recently Resolved</h4>
      <div className="resolvedBox">Prolonged Inactivity<br /><small>Nika • 08:15 AM</small></div>
    </section>
  );
}

function LiveFeedCard() {
  const events = [
    { type: "Alert", text: "Fall detected in Living Room", time: "2 min ago" },
    { type: "Activity", text: "Activity status changed to Walking", time: "5 min ago" },
    { type: "System", text: "Camera reconnected", time: "12 min ago" },
    { type: "Activity", text: "Activity status changed to Sitting", time: "15 min ago" },
  ];

  return (
    <section className="card sideCard">
      <h3>Live Activity Feed</h3>
      <p>Real-time system events</p>

      <div className="feedList">
        {events.map((event) => (
          <div key={event.text} className={`feedItem ${event.type.toLowerCase()}`}>
            <div>
              <span>{event.type}</span>
              <small>{event.time}</small>
            </div>
            <p>{event.text}</p>
            <small>Patient: Nika</small>
          </div>
        ))}
      </div>

      <button className="viewAll">View All Activity</button>
    </section>
  );
}

function Overview() {
  return (
    <>
      <PageHeader title="Overview" subtitle="Here's your activity overview for today" />

      <div className="statsGrid four">
        <StatCard icon="person" title="Patient Status" value="Active" note="Monitoring enabled" color="purple" />
        <StatCard icon="sensors" title="Active Sensors" value="3" note="All operational" color="teal" />
        <StatCard icon="warning" title="Alerts Today" value="1" note="0 resolved" color="orange" />
        <StatCard icon="check_circle" title="System Status" value="Normal" note="No issues detected" color="mint" />
      </div>

      <div className="overviewGrid">
        <div className="mainColumn">
          <ActivityMonitorCard />
          <TimelineCard />
        </div>

        <div className="rightColumn">
          <ActiveAlertsCard />
          <LiveFeedCard />
        </div>
      </div>
    </>
  );
}

function ActivityPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <>
      <PageHeader
        title="Activity Monitor"
        subtitle="Real-time monitoring of Nika's current activity"
        showBack
        setPage={setPage}
      />

      <div className="widePage">
        <ActivityMonitorCard large />
        <TimelineCard />
      </div>
    </>
  );
}

function MovementChart() {
  return (
    <section className="card chartCard">
      <h3>Activity Timeline</h3>
      <p>Activity distribution including fall incidents</p>

      <svg className="lineChart" viewBox="0 0 900 260">
        <line x1="40" y1="220" x2="860" y2="220" />
        <line x1="40" y1="30" x2="40" y2="220" />

        <polyline points="40,40 160,40 280,160 400,120 520,40 640,80 760,60 860,140" className="line purpleLine" />
        <polyline points="40,220 160,220 280,120 400,80 520,140 640,120 760,160 860,180" className="line tealLine" />
        <polyline points="40,220 160,220 280,220 400,40 520,220 640,220 760,220 860,220" className="line orangeLine" />

        <text x="40" y="245">00:00</text>
        <text x="280" y="245">06:00</text>
        <text x="520" y="245">12:00</text>
        <text x="760" y="245">18:00</text>
        <text x="850" y="245">21:00</text>
      </svg>

      <div className="chartLegend">
        <span><b className="tealDot"></b>Standing</span>
        <span><b className="purpleDot"></b>Sitting</span>
        <span><b className="orangeDot"></b>Fall Detected</span>
      </div>
    </section>
  );
}

function BarChartCard() {
  return (
    <section className="card chartCard">
      <h3>Fall Incidents</h3>
      <p>Number of falls detected</p>

      <div className="barChart">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
          const heights = [0, 50, 0, 100, 50, 0, 0];
          return (
            <div key={day} className="barItem">
              <div className="bar" style={{ height: `${heights[index]}%` }}></div>
              <span>{day}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MovementPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <>
      <PageHeader
        title="Movement History"
        subtitle="Review Nika's activity patterns and trends over time"
        showBack
        setPage={setPage}
      />

      <div className="statsGrid three">
  <StatCard
    icon="trending_up"
    title="Active Time Today"
    value="5.0h"
    note="Standing + Walking"
    color="teal"
  />

  <StatCard
    icon="event"
    title="Rest Time Today"
    value="17h"
    note="Sitting + Laying"
    color="purple"
  />

  <StatCard
    icon="warning"
    title="Falls (This Week)"
    value="4"
    note="Avg: 0.6 per day"
    color="orange"
  />
</div>

      <MovementChart />
      <BarChartCard />
    </>
  );
}

function AlertHistoryPage({ setPage }: { setPage: (page: Page) => void }) {
  const alerts = [
    {
      title: "Fall Detected",
      level: "HIGH",
      status: "Resolved",
      name: "Tanya Wilkinson",
      date: "March 19, 2026 at 09:42 AM",
      room: "Room 204 - Bathroom",
      note: "Patient assisted, no injuries reported. Medical team responded promptly.",
      color: "orangeAlert",
    },
    {
      title: "Prolonged Inactivity",
      level: "MEDIUM",
      status: "Resolved",
      name: "Amy White",
      date: "March 19, 2026 at 08:15 AM",
      room: "Room 315 - Bedroom",
      note: "Patient was sleeping, no intervention needed.",
      color: "purpleAlert",
    },
    {
      title: "Unusual Movement",
      level: "LOW",
      status: "Dismissed",
      name: "Tyler Young",
      date: "March 18, 2026 at 11:20 AM",
      room: "Room 212 - Hallway",
      note: "False alarm - patient was exercising.",
      color: "tealAlert",
    },
  ];

  return (
    <>
      <PageHeader
        title="Alert History"
        subtitle="Review and manage all alert incidents"
        showBack
        setPage={setPage}
      />

<div className="statsGrid three alertStatsGrid">
  <StatCard
    icon="warning"
    title="Total Alerts"
    value="5"
    note="All time"
    color="orange"
  />

  <StatCard
    icon="check_circle"
    title="Resolved"
    value="4"
    note="Resolved alerts"
    color="teal"
  />

  <StatCard
    icon="schedule"
    title="Avg Response Time"
    value="5.2"
    note="minutes"
    color="purple"
  />
</div>

      <section className="filterCard">
        <label>
          Filter by Type
          <select>
            <option>All Types</option>
          </select>
        </label>

        <label>
          Filter by Status
          <select>
            <option>All Statuses</option>
          </select>
        </label>

        <button>Reset Filters</button>
      </section>

      <div className="alertList">
        {alerts.map((alert) => (
          <article key={alert.title + alert.name} className={`alertHistoryItem ${alert.color}`}>
            <div className="alertIcon">
  <Icon name="warning" />
</div>
            <div>
              <h3>
                {alert.title} <span className="levelTag">{alert.level}</span>{" "}
                <span className="resolvedTag">{alert.status}</span>
              </h3>
              <p>{alert.name}</p>
              <div className="alertIcon">
  <Icon name="warning" />
</div>

<p>
  <Icon name="event" /> {alert.date}
</p>

<p>
  <Icon name="location_on" /> {alert.room}
</p>

<p>
  <Icon name="schedule" /> Response time: 2 min
</p>

              <div className="notificationTags">
                <span>Telegram</span>
                <span>SMS</span>
                <span>Emergency Call</span>
              </div>

              <div className="noteBox">
                <strong>Notes:</strong>
                <p>{alert.note}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function NotificationsPage({ setPage }: { setPage: (page: Page) => void }) {
  const channels = [
    ["Telegram Bot", "@fall_detection_bot", "2 hours ago", "45 notifications"],
    ["SMS Alerts", "+1 (555) 123-4567", "4 hours ago", "32 notifications"],
    ["Emergency Call", "+1 (555) 911-0000", "Never triggered", "0 notifications"],
    ["Email Notifications", "caregiver@example.com", "1 day ago", "12 notifications"],
  ];

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Manage notification channels and alert preferences"
        showBack
        setPage={setPage}
      />

<div className="statsGrid three">
  <StatCard
    icon="motion_sensor_active"
    title="Active Channels"
    value="3/4"
    note="Notification methods"
    color="purple"
  />

  <StatCard
    icon="notifications_active"
    title="Total Notifications"
    value="89"
    note="All time"
    color="teal"
  />

  <StatCard
    icon="pace"
    title="Delivery Rate"
    value="98.5%"
    note="Success rate"
    color="orange"
  />
</div>

      <section className="card">
        <h3>Notification Channels</h3>
        <p>Configure how you want to receive alerts</p>

        <div className="channelList">
          {channels.map((channel) => (
            <div className="channelItem" key={channel[0]}>
              <div>
                <h4>{channel[0]} <span className="activeTag">Active</span></h4>
                <p>{channel[1]}</p>
              </div>

              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span></span>
              </label>

              <div className="channelStats">
                <p>Last Sent<br /><strong>{channel[2]}</strong></p>
                <p>Total Sent<br /><strong>{channel[3]}</strong></p>
              </div>

              <button className="configureButton">⚙ Configure Channel</button>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>Alert Preferences</h3>
        <p>Customize when and how you receive notifications</p>

        <div className="preferenceList">
          <label>
            <strong>Fall Detection Alerts</strong>
            <small>Immediate notification when a fall is detected</small>
            <input type="checkbox" defaultChecked />
          </label>

          <label>
            <strong>Prolonged Inactivity Alerts</strong>
            <small>Alert when no movement detected for extended period</small>
            <input type="text" defaultValue="30" />
          </label>

          <label>
            <strong>Unusual Movement Alerts</strong>
            <small>Notify for abnormal activity patterns</small>
            <input type="checkbox" defaultChecked />
          </label>

          <label>
            <strong>Daily Summary</strong>
            <small>Receive a daily report of all activities</small>
            <input type="time" />
          </label>
        </div>

        <button className="primaryButton saveButton">Save Preferences</button>
      </section>

      <section className="card">
        <h3>Recent Notifications</h3>
        <p>Last 5 sent notifications</p>

        {[
          "Fall detected in Room 204",
          "Fall detected in Room 204",
          "Prolonged inactivity detected",
          "Daily activity summary",
          "System online - monitoring active",
        ].map((item) => (
          <div className="recentNotification" key={item}>
            <span>💬</span>
            <strong>{item}</strong>
            <small>✓</small>
          </div>
        ))}
      </section>
    </>
  );
}

function Dashboard() {
  const [page, setPage] = useState<Page>("overview");
  const [loggedIn, setLoggedIn] = useState(true);

  if (!loggedIn) {
    return null;
  }

  return (
    <div className="dashboard">
      <Sidebar page={page} setPage={setPage} onLogout={() => setLoggedIn(false)} />

      <main className="mainArea">
        <Topbar />

        <div className="content">
          {page === "overview" && <Overview />}
          {page === "activity" && <ActivityPage setPage={setPage} />}
          {page === "movement" && <MovementPage setPage={setPage} />}
          {page === "alerts" && <AlertHistoryPage setPage={setPage} />}
          {page === "notifications" && <NotificationsPage setPage={setPage} />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <AuthPage
        mode={authMode}
        setMode={setAuthMode}
        onLogin={() => setIsAuthenticated(true)}
      />
    );
  }

  return <Dashboard />;
}