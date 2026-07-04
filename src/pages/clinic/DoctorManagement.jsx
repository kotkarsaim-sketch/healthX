import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, X } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import StatusBadge from '../../components/StatusBadge';

export default function DoctorManagement() {
  const { doctors: allDocs, changeDoctorStatus } = useQueue();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Doctor Management</h1>
          <p className="admin-subtitle">Manage doctors and availability</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}><Plus size={18} /> Add Doctor</button>
      </div>

      <div className="doctor-grid">
        {allDocs.map((doc, i) => (
          <motion.div className="chart-card" key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(135deg, var(--primary-bg), var(--accent-bg))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', color: 'var(--primary)', flexShrink: 0 }}>
                {doc.name.split(' ').slice(1).map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{doc.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{doc.specialty} · {doc.department}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <Star size={13} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{doc.rating}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>· {doc.experience} yrs</span>
                </div>
              </div>
              <StatusBadge status={doc.status || 'available'} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14, textAlign: 'center' }}>
              <div style={{ background: 'var(--primary-bg)', borderRadius: 8, padding: '8px 0' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>{doc.patientsToday || 0}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Total</div>
              </div>
              <div style={{ background: 'var(--accent-bg)', borderRadius: 8, padding: '8px 0' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent)' }}>{doc.completedToday || 0}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Done</div>
              </div>
              <div style={{ background: 'var(--warning-bg)', borderRadius: 8, padding: '8px 0' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--warning)' }}>{doc.avgConsultTime}m</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Avg</div>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 10 }}>Hours: {doc.workingHours}</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {['available', 'late', 'emergency', 'break'].map(s => (
                <button key={s} className={`btn btn-sm ${doc.status === s ? 'btn-primary' : 'btn-ghost'}`} style={{ fontSize: '0.72rem', padding: '4px 10px', textTransform: 'capitalize' }} onClick={() => changeDoctorStatus(s, s === 'late' ? 20 : 0)}>{s}</button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAdd(false)}>
            <motion.div className="modal" initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 480, borderRadius: 'var(--radius)' }}>
              <div className="modal-header">
                <h2 className="modal-title">Add Doctor</h2>
                <button className="btn-icon btn-ghost" onClick={() => setShowAdd(false)}><X size={20} /></button>
              </div>
              <div className="input-group"><label className="input-label">Full Name</label><input className="input" placeholder="Dr. Full Name" /></div>
              <div className="input-group"><label className="input-label">Specialty</label><input className="input" placeholder="e.g. Cardiologist" /></div>
              <div className="input-group"><label className="input-label">Department</label><input className="input" placeholder="e.g. Cardiology" /></div>
              <div className="input-group"><label className="input-label">Working Hours</label><input className="input" placeholder="9:00 AM – 5:00 PM" /></div>
              <button className="btn btn-primary btn-full" onClick={() => setShowAdd(false)}>Add Doctor</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
