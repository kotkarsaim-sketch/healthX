import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarPlus, X, QrCode, Clock, MapPin } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import QRCode from '../components/QRCode';

export default function Appointments() {
  const { currentUser: user, doctor, userToken, doctors: allDocs } = useQueue();
  const [showBook, setShowBook] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [form, setForm] = useState({ doctor: '1', date: '', time: '' });
  const [booked, setBooked] = useState(null);

  const handleBook = (e) => {
    e.preventDefault();
    const doc = allDocs.find(d => d.id === Number(form.doctor));
    setBooked({ doctor: doc?.name, date: form.date, time: form.time, token: 40 + Math.floor(Math.random() * 10) });
    setShowBook(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Appointments</h1>
        <p className="page-subtitle">Manage your clinic visits</p>
      </div>

      {/* Current Appointment */}
      <motion.div className="card card-accent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="card-label">Current Appointment</div>
        <div className="spacer-sm" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{doctor?.name}</div>
            <div className="card-desc">{doctor?.specialty} • {user.department}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <Clock size={14} color="var(--text-muted)" />
              <span className="card-desc">{user.appointmentTime}</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>#{userToken}</div>
            <div className="card-desc">Your Token</div>
          </div>
        </div>
        <div className="spacer" />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowQR(true)}><QrCode size={16} /> QR Check-in</button>
          <button className="btn btn-danger btn-sm">Cancel</button>
        </div>
      </motion.div>

      <div className="spacer" />

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQR(false)}>
            <motion.div className="modal" initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
              <div className="modal-header">
                <h2 className="modal-title">QR Check-in</h2>
                <button className="btn-icon btn-ghost" onClick={() => setShowQR(false)}><X size={20} /></button>
              </div>
              <QRCode value={`QC-TOKEN-${userToken}-${user.id}`} size={180} />
              <div className="spacer" />
              <div style={{ fontWeight: 700 }}>Token #{userToken}</div>
              <div className="card-desc">{user.name} • {doctor?.name}</div>
              <div className="card-desc">Scan at clinic reception</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book New */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center', padding: 28 }}>
        <CalendarPlus size={32} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Book New Appointment</div>
        <div className="card-desc" style={{ marginBottom: 16 }}>Choose a doctor and time slot</div>
        <button className="btn btn-primary btn-full" onClick={() => setShowBook(true)}>Book Appointment</button>
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBook && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBook(false)}>
            <motion.div className="modal" initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Book Appointment</h2>
                <button className="btn-icon btn-ghost" onClick={() => setShowBook(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleBook}>
                <div className="input-group">
                  <label className="input-label">Select Doctor</label>
                  <select className="input" value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })}>
                    {allDocs.map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Date</label>
                  <input type="date" className="input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                </div>
                <div className="input-group">
                  <label className="input-label">Preferred Time</label>
                  <select className="input" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required>
                    <option value="">Select time slot</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="15:30">03:30 PM</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-full">Confirm Booking</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booked Confirmation */}
      {booked && (
        <motion.div className="card card-success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16 }}>
          <div className="badge badge-green" style={{ marginBottom: 8 }}><span className="badge-dot" /> Confirmed</div>
          <div style={{ fontWeight: 700 }}>{booked.doctor}</div>
          <div className="card-desc">{booked.date} at {booked.time}</div>
          <div className="card-desc">Digital Token: #{booked.token}</div>
        </motion.div>
      )}

      <div className="spacer" />

      {/* AI Suggestion */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <MapPin size={16} color="var(--accent)" />
          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Best Times to Visit</span>
        </div>
        <div style={{ background: 'var(--accent-bg)', borderRadius: 'var(--radius-sm)', padding: 12, fontSize: '0.82rem', lineHeight: 1.8 }}>
          <div>🟢 <strong>8:00 AM</strong> — Shortest wait (~8 min)</div>
          <div>🟢 <strong>1:00 PM</strong> — Low traffic (~12 min)</div>
          <div>🟡 <strong>5:00 PM</strong> — Moderate (~18 min)</div>
          <div>🔴 <strong>11:00 AM</strong> — Peak hours (~40 min)</div>
        </div>
      </motion.div>
    </div>
  );
}
