import { motion } from 'framer-motion';
import { Users, Hash, CheckCircle2, Clock, Stethoscope, AlertTriangle, Activity, PhoneForwarded } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import StatusBadge from '../../components/StatusBadge';

const c = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } });

export default function ClinicDashboard() {
  const { currentToken, analytics, progress, doctors: allDocs, doctorStatus, paused, togglePause, patients } = useQueue();
  const waiting = patients.filter(p => p.status === 'waiting').length;
  const inProgress = patients.find(p => p.status === 'in-progress');

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Clinic Dashboard</h1>
          <p className="admin-subtitle">Today's queue overview</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={`btn btn-sm ${paused ? 'btn-success' : 'btn-danger'}`} onClick={togglePause}>
            {paused ? '▶ Resume Queue' : '⏸ Pause Queue'}
          </button>
        </div>
      </div>

      <div className="stats-grid cols-4">
        <motion.div className="stat-card" {...c(0)}>
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}><Users size={22} /></div>
          <div className="stat-value">{waiting}</div>
          <div className="stat-label">Patients Waiting</div>
        </motion.div>
        <motion.div className="stat-card" {...c(1)}>
          <div className="stat-icon" style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}><Hash size={22} /></div>
          <div className="stat-value">#{currentToken}</div>
          <div className="stat-label">Current Token</div>
        </motion.div>
        <motion.div className="stat-card" {...c(2)}>
          <div className="stat-icon" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}><CheckCircle2 size={22} /></div>
          <div className="stat-value">{analytics.completed}</div>
          <div className="stat-label">Completed Today</div>
        </motion.div>
        <motion.div className="stat-card" {...c(3)}>
          <div className="stat-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}><Clock size={22} /></div>
          <div className="stat-value">{analytics.avgWaitTime}m</div>
          <div className="stat-label">Avg Wait Time</div>
        </motion.div>
      </div>

      <div className="stats-grid cols-4">
        <motion.div className="stat-card" {...c(4)}>
          <div className="stat-value sm">{analytics.avgConsultTime}m</div>
          <div className="stat-label">Avg Consult</div>
        </motion.div>
        <motion.div className="stat-card" {...c(5)}>
          <div className="stat-value sm">3</div>
          <div className="stat-label">Active Doctors</div>
        </motion.div>
        <motion.div className="stat-card" {...c(6)}>
          <div className="stat-value sm">{analytics.totalPatients}</div>
          <div className="stat-label">Total Today</div>
        </motion.div>
        <motion.div className="stat-card" {...c(7)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StatusBadge status={paused ? 'break' : 'available'} />
          </div>
          <div className="stat-label" style={{ marginTop: 6 }}>Queue Status</div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div className="chart-card" {...c(8)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 className="chart-title"><Activity size={18} /> Queue Progress</h3>
          <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{progress}%</span>
        </div>
        <div className="progress-track" style={{ height: 14 }}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <span>{analytics.completed} completed</span>
          <span>{waiting} remaining</span>
        </div>
      </motion.div>

      {/* Currently Serving */}
      {inProgress && (
        <motion.div className="chart-card" style={{ borderLeft: '4px solid var(--primary)' }} {...c(9)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Now Serving</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Token #{inProgress.token} — {inProgress.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>Appointment: {inProgress.appointmentTime}</div>
            </div>
            <PhoneForwarded size={24} color="var(--primary)" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
