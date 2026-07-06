import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Building2, Stethoscope, User, ArrowRight, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import HeroGeometric from '../components/HeroGeometric';

const roles = [
  { role: 'super', title: 'Super Admin', desc: 'Platform owner — manage all clinics, subscriptions & revenue', icon: Shield, color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)', path: '/super' },
  { role: 'clinic-admin', title: 'Clinic Admin', desc: 'Manage your clinic queue, doctors & appointments', icon: Building2, color: '#3B82F6', bg: 'rgba(59,130,246,0.15)', path: '/clinic' },
  { role: 'doctor', title: 'Doctor', desc: 'View patients, manage consultations & schedule', icon: Stethoscope, color: '#10B981', bg: 'rgba(16,185,129,0.15)', path: '/doctor' },
  { role: 'patient', title: 'Patient', desc: 'Track your queue, book appointments & check wait time', icon: User, color: '#F59E0B', bg: 'rgba(245,158,11,0.15)', path: '/' },
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
    <HeroGeometric
      title1="Smart Queue"
      title2="Management"
      description="The intelligent clinic queue platform that connects patients, doctors, and clinics in real-time."
      color1="#1E3A5F"
      color2="#A7C7E7"
      speed={0.8}
    >
      <div className="login-glass">
        {/* Brand header */}
        <div className="login-glass-header">
          <div className="login-glass-logo">
            <Activity size={24} />
          </div>
          <div className="login-glass-brand">
            <div className="login-glass-title">QueueCare</div>
            <div className="login-glass-subtitle">Smart Clinic Queue Platform</div>
          </div>
        </div>

        {/* Role Selection */}
        <p className="login-roles-label">Select a role to explore</p>
        <div className="login-roles">
          {roles.map((r, i) => (
            <motion.button
              key={r.role}
              className="login-role-card"
              onClick={() => handleLogin(r.role)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="login-role-icon" style={{ background: r.bg, color: r.color }}>
                <r.icon size={20} />
              </div>
              <div className="login-role-info">
                <div className="login-role-title">{r.title}</div>
                <div className="login-role-desc">{r.desc}</div>
              </div>
              <ArrowRight size={16} className="login-role-arrow" />
            </motion.button>
          ))}
        </div>

        <p className="login-demo-note">
          Demo mode — no real credentials needed
        </p>
      </div>
    </HeroGeometric>
  );
}
