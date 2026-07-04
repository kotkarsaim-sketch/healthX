import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, Circle } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

const c = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } });

const timeSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00'];

export default function DoctorSchedule() {
  const { patients } = useQueue();
  const completed = patients.filter(p => p.status === 'completed');
  const upcoming = patients.filter(p => p.status === 'waiting' || p.status === 'in-progress');

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">My Schedule</h1>
          <p className="admin-subtitle">Today's appointment timeline</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Timeline */}
        <motion.div className="chart-card" {...c(0)}>
          <h3 className="chart-title"><Calendar size={18} /> Today's Timeline</h3>
          <div className="spacer-sm" />
          <div className="timeline">
            {patients.slice(0, 15).map((p, i) => (
              <div className="timeline-item" key={p.id}>
                {i < 14 && <div className="timeline-line" />}
                <div className={`timeline-dot ${p.status === 'completed' ? 'done' : p.status === 'in-progress' ? 'current' : 'waiting'}`}>
                  {p.status === 'completed' ? <CheckCircle2 size={14} /> : p.status === 'in-progress' ? '▶' : <Circle size={10} />}
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">#{p.token} {p.name}</div>
                  <div className="timeline-sub">{p.appointmentTime} {p.consultDuration ? `· ${p.consultDuration}m` : ''}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Schedule Grid */}
        <div>
          <motion.div className="chart-card" {...c(1)}>
            <h3 className="chart-title"><Clock size={18} /> Time Slots</h3>
            <div className="spacer-sm" />
            {timeSlots.map(slot => {
              const patient = patients.find(p => p.appointmentTime === slot);
              return (
                <div key={slot} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', width: 50, color: 'var(--text-muted)' }}>{slot}</span>
                  {patient ? (
                    <div style={{ flex: 1, padding: '6px 12px', borderRadius: 8, background: patient.status === 'completed' ? 'var(--accent-bg)' : patient.status === 'in-progress' ? 'var(--primary-bg)' : 'var(--surface-hover)', fontSize: '0.82rem' }}>
                      <span style={{ fontWeight: 600 }}>#{patient.token} {patient.name}</span>
                      <span style={{ marginLeft: 8, fontSize: '0.72rem', color: 'var(--text-muted)' }}>{patient.status}</span>
                    </div>
                  ) : (
                    <div style={{ flex: 1, padding: '6px 12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Available</div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
