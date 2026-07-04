import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Building2, Stethoscope, User, ArrowRight, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roles = [
  { role: 'super', title: 'Super Admin', desc: 'Platform owner — manage all clinics, subscriptions & revenue', icon: Shield, color: '#8B5CF6', bg: '#F5F3FF', path: '/super' },
  { role: 'clinic-admin', title: 'Clinic Admin', desc: 'Manage your clinic queue, doctors & appointments', icon: Building2, color: '#2563EB', bg: '#EFF6FF', path: '/clinic' },
  { role: 'doctor', title: 'Doctor', desc: 'View patients, manage consultations & schedule', icon: Stethoscope, color: '#10B981', bg: '#ECFDF5', path: '/doctor' },
  { role: 'patient', title: 'Patient', desc: 'Track your queue, book appointments & check wait time', icon: User, color: '#F59E0B', bg: '#FFFBEB', path: '/' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const account = login(role);
    if (account) {
      const r = roles.find(r => r.role === role);
      navigate(r?.path || '/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <motion.div className="login-container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo"><Activity size={28} /></div>
          <h1 className="login-title">QueueCare</h1>
          <p className="login-subtitle">Smart Clinic Queue Management Platform</p>
        </div>

        {/* Role Cards */}
        <div className="login-roles">
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 14, textAlign: 'center' }}>Select a role to explore the demo</p>
          {roles.map((r, i) => (
            <motion.button key={r.role} className="login-role-card" onClick={() => handleLogin(r.role)}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <div className="login-role-icon" style={{ background: r.bg, color: r.color }}><r.icon size={22} /></div>
              <div className="login-role-info">
                <div className="login-role-title">{r.title}</div>
                <div className="login-role-desc">{r.desc}</div>
              </div>
              <ArrowRight size={18} color="var(--text-muted)" />
            </motion.button>
          ))}
        </div>

        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 20 }}>
          Demo mode — no real credentials needed
        </p>
      </motion.div>
    </div>
  );
}
