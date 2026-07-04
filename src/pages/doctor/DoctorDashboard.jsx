import { motion } from 'framer-motion';
import { PhoneForwarded, CheckCircle2, Clock, Users, Pause, Play } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { useState } from 'react';

const c = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } });

export default function DoctorDashboard() {
  const { patients, currentToken, completePatient, analytics, doctorStatus, changeDoctorStatus } = useQueue();
  const [available, setAvailable] = useState(true);
  const inProgress = patients.find(p => p.status === 'in-progress');
  const waiting = patients.filter(p => p.status === 'waiting');
  const completed = patients.filter(p => p.status === 'completed');

  const toggleAvailability = () => {
    const next = available ? 'break' : 'available';
    setAvailable(!available);
    changeDoctorStatus(next);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">My Dashboard</h1>
          <p className="admin-subtitle">Today's consultation overview</p>
        </div>
        <button className={`btn ${available ? 'btn-success' : 'btn-secondary'}`} onClick={toggleAvailability}>
          {available ? <><Play size={16} /> Available</> : <><Pause size={16} /> On Break</>}
        </button>
      </div>

      <div className="stats-grid cols-3">
        <motion.div className="stat-card" {...c(0)}>
          <div className="stat-icon" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}><CheckCircle2 size={22} /></div>
          <div className="stat-value">{completed.length}</div>
          <div className="stat-label">Seen Today</div>
        </motion.div>
        <motion.div className="stat-card" {...c(1)}>
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}><Users size={22} /></div>
          <div className="stat-value">{waiting.length}</div>
          <div className="stat-label">Remaining</div>
        </motion.div>
        <motion.div className="stat-card" {...c(2)}>
          <div className="stat-icon" style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}><Clock size={22} /></div>
          <div className="stat-value">{analytics.avgConsultTime}m</div>
          <div className="stat-label">Avg Time</div>
        </motion.div>
      </div>

      {/* Current Patient */}
      {inProgress ? (
        <motion.div className="chart-card" {...c(3)} style={{ borderLeft: '4px solid var(--accent)', marginBottom: 16 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Current Patient</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>Token #{inProgress.token} — {inProgress.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>Age: {inProgress.age} · Apt: {inProgress.appointmentTime}</div>
            </div>
            <button className="btn btn-primary" onClick={() => completePatient(currentToken)}>
              <CheckCircle2 size={16} /> Complete & Next
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div className="chart-card" {...c(3)} style={{ textAlign: 'center', padding: 32 }}>
          <PhoneForwarded size={32} color="var(--text-muted)" style={{ marginBottom: 8 }} />
          <div style={{ fontWeight: 600, color: 'var(--text-muted)' }}>No patient in consultation</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>The next patient will be called automatically</div>
        </motion.div>
      )}

      {/* Queue */}
      <motion.div className="chart-card" {...c(4)} style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 700 }}>Upcoming Patients ({waiting.length})</h3>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Token</th><th>Patient</th><th>Age</th><th>Time</th></tr></thead>
            <tbody>
              {waiting.slice(0, 10).map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>#{p.token}</td>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>{p.age}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p.appointmentTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
