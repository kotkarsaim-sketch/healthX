import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import ProgressRing from '../components/ProgressRing';
import StatusBadge from '../components/StatusBadge';

export default function QueueTracker() {
  const { currentToken, userToken, ahead, estimatedWait, doctor, doctorStatus, progress, patients, analytics } = useQueue();
  const completed = patients.filter(p => p.status === 'completed').slice(-5).reverse();
  const isMyTurn = ahead === 0;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Live Queue</h1>
        <p className="page-subtitle">Real-time tracking of your position</p>
      </div>

      {/* Progress Ring */}
      <motion.div className="card card-full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: 28 }}>
        <ProgressRing value={progress} size={160} stroke={14} color={isMyTurn ? '#10B981' : '#2563EB'} label={`${progress}%`} sublabel="Completed" />
        <div className="spacer" />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>#{currentToken}</div>
            <div className="card-desc">Now Serving</div>
          </div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>#{userToken}</div>
            <div className="card-desc">Your Token</div>
          </div>
        </div>
      </motion.div>

      <div className="spacer" />

      {/* Status Cards */}
      <div className="card-grid">
        <motion.div className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Users size={18} color="var(--primary)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Ahead</span>
          </div>
          <div className="card-value">{ahead}</div>
          <div className="card-desc">patients</div>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Clock size={18} color="var(--warning)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Est. Wait</span>
          </div>
          <div className="card-value">{estimatedWait}<span style={{ fontSize: '0.85rem' }}> min</span></div>
          <div className="card-desc">AI predicted</div>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Zap size={18} color="var(--accent)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Avg Consult</span>
          </div>
          <div className="card-value sm">{doctor?.avgConsultTime || 12} min</div>
          <div className="card-desc">per patient</div>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <TrendingUp size={18} color="var(--purple)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Doctor</span>
          </div>
          <div style={{ marginTop: 4 }}><StatusBadge status={doctorStatus} /></div>
        </motion.div>
      </div>

      <div className="spacer" />

      {/* Smart Prediction */}
      <motion.div className="card card-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Zap size={18} color="var(--primary)" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>AI Smart Prediction</span>
        </div>
        <div style={{ background: 'var(--primary-bg)', borderRadius: 'var(--radius-sm)', padding: 14, fontSize: '0.82rem', lineHeight: 1.7 }}>
          <div><strong>Consultation Speed:</strong> {doctor?.name} averages {doctor?.avgConsultTime} min/patient</div>
          <div><strong>Queue Pace:</strong> {analytics.completed} of {analytics.totalPatients} served ({progress}%)</div>
          <div><strong>Your Expected Time:</strong> ~{estimatedWait > 0 ? estimatedWait + ' minutes' : 'Now!'}</div>
          {doctorStatus === 'late' && <div style={{ color: 'var(--warning)', fontWeight: 600 }}>⚠ Doctor delay factored into estimate</div>}
        </div>
      </motion.div>

      <div className="spacer" />

      {/* Recent Completions */}
      <motion.div className="card card-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="section-title">Recent Completions</div>
        <div className="timeline">
          {completed.map((p, i) => (
            <div className="timeline-item" key={p.id}>
              {i < completed.length - 1 && <div className="timeline-line" />}
              <div className="timeline-dot done"><CheckCircle2 size={16} /></div>
              <div className="timeline-content">
                <div className="timeline-title">Token #{p.token} — {p.name}</div>
                <div className="timeline-sub">{p.consultDuration} min consultation</div>
              </div>
            </div>
          ))}
          {completed.length === 0 && <div className="card-desc" style={{ padding: 12 }}>No completions yet</div>}
        </div>
      </motion.div>
    </div>
  );
}
