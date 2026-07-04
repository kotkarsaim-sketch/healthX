import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneForwarded, CheckCircle2, SkipForward, UserPlus, AlertTriangle, Play, Pause, X } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

export default function QueueControl() {
  const { patients, currentToken, paused, togglePause, completePatient, skipPatient, addPatient } = useQueue();
  const [newName, setNewName] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const waiting = patients.filter(p => p.status === 'waiting');
  const inProgress = patients.find(p => p.status === 'in-progress');
  const completed = patients.filter(p => p.status === 'completed');

  const handleAdd = (e) => { e.preventDefault(); if (newName.trim()) { addPatient(newName.trim()); setNewName(''); setShowAdd(false); } };
  const callNext = () => { if (inProgress) completePatient(currentToken); };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Queue Control</h1>
          <p className="admin-subtitle">Manage today's patient queue</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={callNext}><PhoneForwarded size={16} /> Call Next</button>
          <button className={`btn ${paused ? 'btn-success' : 'btn-danger'}`} onClick={togglePause}>
            {paused ? <><Play size={16} /> Resume</> : <><Pause size={16} /> Pause</>}
          </button>
          <button className="btn btn-secondary" onClick={() => setShowAdd(true)}><UserPlus size={16} /> Walk-in</button>
        </div>
      </div>

      {/* Currently Serving */}
      {inProgress && (
        <motion.div className="chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ borderLeft: '4px solid var(--primary)', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="badge badge-blue badge-pulse" style={{ marginBottom: 6 }}><span className="badge-dot" /> In Progress</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Token #{inProgress.token} — {inProgress.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Age: {inProgress.age} · Apt: {inProgress.appointmentTime}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-success btn-sm" onClick={() => completePatient(currentToken)}><CheckCircle2 size={14} /> Complete</button>
              <button className="btn btn-secondary btn-sm" onClick={() => skipPatient(currentToken)}><SkipForward size={14} /> Skip</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Walk-in */}
      {showAdd && (
        <motion.div className="chart-card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginBottom: 16 }}>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input className="input" placeholder="Patient name" value={newName} onChange={e => setNewName(e.target.value)} style={{ flex: 1 }} required />
            <button type="submit" className="btn btn-primary btn-sm">Add</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}><X size={16} /></button>
          </form>
        </motion.div>
      )}

      {/* Waiting Queue */}
      <div className="chart-card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Waiting Queue ({waiting.length})</h3>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Token</th><th>Patient</th><th>Age</th><th>Appointment</th><th>Check-in</th><th>Actions</th></tr></thead>
            <tbody>
              {waiting.slice(0, 15).map(p => (
                <tr key={p.id}>
                  <td><span style={{ fontWeight: 800, color: 'var(--primary)' }}>#{p.token}</span></td>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>{p.age}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p.appointmentTime}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p.checkInTime || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-success btn-sm" style={{ padding: '4px 8px' }} onClick={() => completePatient(p.token)} title="Complete"><CheckCircle2 size={14} /></button>
                      <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} onClick={() => skipPatient(p.token)} title="Skip"><SkipForward size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed */}
      <div className="chart-card" style={{ padding: 0, marginTop: 16 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Completed ({completed.length})</h3>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Token</th><th>Patient</th><th>Duration</th></tr></thead>
            <tbody>
              {completed.slice(-8).reverse().map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 700 }}>#{p.token}</td>
                  <td>{p.name}</td>
                  <td><span className="badge badge-green">{p.consultDuration}m</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
