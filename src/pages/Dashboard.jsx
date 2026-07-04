import { motion } from 'framer-motion';
import { Hash, Users, Clock, Stethoscope, Activity, Timer } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import StatusBadge from '../components/StatusBadge';
import ThemeToggle from '../components/ThemeToggle';
import NotificationPanel from '../components/NotificationPanel';

const card = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.07, duration: 0.35 } });

export default function Dashboard() {
  const { currentToken, userToken, ahead, estimatedWait, doctor, doctorStatus, progress, totalPatients, analytics, currentUser: user } = useQueue();

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Good Morning 👋</div>
          <div className="page-title">{user.name}</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <ThemeToggle />
          <NotificationPanel />
        </div>
      </div>

      {/* Welcome Banner */}
      <motion.div className="welcome-banner" {...card(0)}>
        <div className="welcome-sub">Your Appointment</div>
        <div className="welcome-name">{doctor?.name}</div>
        <div className="welcome-sub">{user.department} • {user.appointmentTime}</div>
        <div className="welcome-token">
          <Hash size={16} />
          <span className="welcome-token-num">Token {userToken}</span>
        </div>
      </motion.div>

      <div className="spacer" />

      {/* Card Grid */}
      <div className="card-grid">
        <motion.div className="card card-accent" {...card(1)}>
          <div className="card-icon blue"><Hash size={20} /></div>
          <div className="card-label">Now Serving</div>
          <div className="card-value">#{currentToken}</div>
          <div className="card-desc">Current patient</div>
        </motion.div>

        <motion.div className="card card-success" {...card(2)}>
          <div className="card-icon green"><Hash size={20} /></div>
          <div className="card-label">Your Token</div>
          <div className="card-value">#{userToken}</div>
          <div className="card-desc">{ahead === 0 ? "It's your turn!" : `${ahead} ahead`}</div>
        </motion.div>

        <motion.div className="card card-warning" {...card(3)}>
          <div className="card-icon amber"><Clock size={20} /></div>
          <div className="card-label">Est. Wait</div>
          <div className="card-value">{estimatedWait}<span style={{ fontSize: '0.9rem', fontWeight: 600 }}> min</span></div>
          <div className="card-desc">AI predicted</div>
        </motion.div>

        <motion.div className="card" {...card(4)}>
          <div className="card-icon purple"><Users size={20} /></div>
          <div className="card-label">Ahead of You</div>
          <div className="card-value">{ahead}</div>
          <div className="card-desc">{ahead === 0 ? 'None!' : 'patients waiting'}</div>
        </motion.div>
      </div>

      <div className="spacer" />

      {/* Doctor Status */}
      <motion.div className="card card-full" {...card(5)}>
        <div className="card-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="card-icon blue"><Stethoscope size={20} /></div>
            <div>
              <div className="card-label">Doctor Status</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{doctor?.name}</div>
            </div>
          </div>
          <StatusBadge status={doctorStatus} />
        </div>
      </motion.div>

      <div className="spacer" />

      {/* Queue Progress */}
      <motion.div className="card card-full" {...card(6)}>
        <div className="card-row" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={18} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Queue Progress</span>
          </div>
          <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{progress}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span className="card-desc">{analytics.completed} completed</span>
          <span className="card-desc">{analytics.waiting} remaining</span>
        </div>
      </motion.div>

      <div className="spacer" />

      {/* Quick Stats */}
      <motion.div className="card card-full" {...card(7)}>
        <div className="card-label" style={{ marginBottom: 12 }}>Today's Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)' }}>{analytics.totalPatients}</div>
            <div className="card-desc">Total</div>
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent)' }}>{analytics.avgConsultTime}m</div>
            <div className="card-desc">Avg Consult</div>
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--warning)' }}>{analytics.avgWaitTime}m</div>
            <div className="card-desc">Avg Wait</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
