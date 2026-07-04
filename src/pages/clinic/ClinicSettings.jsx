import { motion } from 'framer-motion';
import { Building2, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { clinics } from '../../utils/mockData';

export default function ClinicSettings() {
  const { user } = useAuth();
  const clinic = clinics.find(c => c.id === user?.clinicId) || clinics[0];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Clinic Settings</h1>
          <p className="admin-subtitle">Configure your clinic profile</p>
        </div>
      </div>

      <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="chart-title"><Building2 size={18} /> Clinic Profile</h3>
        <div className="spacer-sm" />
        <div className="input-group"><label className="input-label">Clinic Name</label><input className="input" defaultValue={clinic.name} /></div>
        <div className="input-group"><label className="input-label">Address</label><input className="input" defaultValue={clinic.address} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="input-group"><label className="input-label">Phone</label><input className="input" defaultValue={clinic.phone} /></div>
          <div className="input-group"><label className="input-label">Email</label><input className="input" defaultValue={clinic.email} /></div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: 8 }}>Save Changes</button>
      </motion.div>

      <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginTop: 16 }}>
        <h3 className="chart-title"><Clock size={18} /> Working Hours</h3>
        <div className="spacer-sm" />
        {Object.entries(clinic.hours).map(([day, hours]) => (
          <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{day}</span>
            <input className="input" defaultValue={hours} style={{ width: 200, textAlign: 'right' }} />
          </div>
        ))}
        <button className="btn btn-primary" style={{ marginTop: 16 }}>Update Hours</button>
      </motion.div>

      <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginTop: 16 }}>
        <h3 className="chart-title">Subscription</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <span className="badge badge-blue" style={{ textTransform: 'capitalize', fontSize: '0.82rem', padding: '6px 14px' }}>{clinic.plan}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>${clinic.monthlyFee}/month</span>
        </div>
        <button className="btn btn-secondary" style={{ marginTop: 12 }}>Upgrade Plan</button>
      </motion.div>
    </div>
  );
}
