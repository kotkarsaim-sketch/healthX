import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Pause, Play, Clock, FileText } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

export default function ConsultationView() {
  const { patients, currentToken, completePatient } = useQueue();
  const inProgress = patients.find(p => p.status === 'in-progress');
  const [notes, setNotes] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (!timerActive || !inProgress) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive, inProgress]);

  useEffect(() => { setTimer(0); setNotes(''); setTimerActive(true); }, [currentToken]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleComplete = () => {
    completePatient(currentToken);
    setNotes('');
    setTimer(0);
  };

  if (!inProgress) {
    return (
      <div className="admin-page">
        <div className="admin-header"><div><h1 className="admin-title">Consultation</h1><p className="admin-subtitle">No active consultation</p></div></div>
        <div className="chart-card" style={{ textAlign: 'center', padding: 48 }}>
          <FileText size={40} color="var(--text-muted)" style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-muted)' }}>Waiting for next patient</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>The patient will appear here when called</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Consultation</h1>
          <p className="admin-subtitle">Token #{inProgress.token} — {inProgress.name}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '8px 16px' }}>
            <Clock size={16} color="var(--primary)" />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', fontVariantNumeric: 'tabular-nums' }}>{formatTime(timer)}</span>
          </div>
          <button className={`btn btn-sm ${timerActive ? 'btn-secondary' : 'btn-success'}`} onClick={() => setTimerActive(!timerActive)}>
            {timerActive ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Resume</>}
          </button>
        </div>
      </div>

      {/* Patient Details */}
      <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ borderLeft: '4px solid var(--accent)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
          <div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Patient</div><div style={{ fontWeight: 700, marginTop: 4 }}>{inProgress.name}</div></div>
          <div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Age</div><div style={{ fontWeight: 700, marginTop: 4 }}>{inProgress.age}</div></div>
          <div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Token</div><div style={{ fontWeight: 700, marginTop: 4 }}>#{inProgress.token}</div></div>
          <div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Appointment</div><div style={{ fontWeight: 700, marginTop: 4 }}>{inProgress.appointmentTime}</div></div>
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginTop: 16 }}>
        <h3 className="chart-title"><FileText size={18} /> Consultation Notes</h3>
        <textarea className="input" rows={6} placeholder="Add consultation notes, diagnosis, prescription..." value={notes} onChange={e => setNotes(e.target.value)} style={{ resize: 'vertical', marginTop: 8 }} />
      </motion.div>

      {/* Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button className="btn btn-primary btn-full" onClick={handleComplete} style={{ padding: 16, fontSize: '1rem' }}>
          <CheckCircle2 size={20} /> Complete Consultation & Call Next
        </button>
      </motion.div>
    </div>
  );
}
