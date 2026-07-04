import { motion } from 'framer-motion';
import { Building2, Users, DollarSign, Activity, TrendingUp, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { platformStats, clinics } from '../../utils/mockData';

const c = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } });

export default function SuperDashboard() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Platform Overview</h1>
          <p className="admin-subtitle">Welcome back, Platform Admin</p>
        </div>
      </div>

      <div className="stats-grid cols-4">
        <motion.div className="stat-card" {...c(0)}>
          <div className="stat-icon" style={{ background: '#F5F3FF', color: '#8B5CF6' }}><Building2 size={22} /></div>
          <div className="stat-value">{platformStats.totalClinics}</div>
          <div className="stat-label">Total Clinics</div>
          <div className="stat-sub">{platformStats.activeClinics} active · {platformStats.trialClinics} trial</div>
        </motion.div>
        <motion.div className="stat-card" {...c(1)}>
          <div className="stat-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}><Users size={22} /></div>
          <div className="stat-value">{platformStats.totalPatients.toLocaleString()}</div>
          <div className="stat-label">Total Patients</div>
          <div className="stat-sub">Across all clinics</div>
        </motion.div>
        <motion.div className="stat-card" {...c(2)}>
          <div className="stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}><DollarSign size={22} /></div>
          <div className="stat-value">${platformStats.monthlyRevenue}</div>
          <div className="stat-label">Monthly Revenue</div>
          <div className="stat-sub">${platformStats.yearlyRevenue}/yr projected</div>
        </motion.div>
        <motion.div className="stat-card" {...c(3)}>
          <div className="stat-icon" style={{ background: '#FFFBEB', color: '#F59E0B' }}><Activity size={22} /></div>
          <div className="stat-value">{platformStats.totalDoctors}</div>
          <div className="stat-label">Active Doctors</div>
          <div className="stat-sub">Avg {platformStats.avgWaitPlatform}m wait</div>
        </motion.div>
      </div>

      <div className="chart-grid">
        <motion.div className="chart-card" {...c(4)}>
          <h3 className="chart-title"><TrendingUp size={18} /> Revenue Trend</h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={platformStats.revenueHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.82rem' }} />
                <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2.5} dot={{ r: 4, fill: '#8B5CF6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <motion.div className="chart-card" {...c(5)}>
          <h3 className="chart-title"><Building2 size={18} /> Clinic Growth</h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={platformStats.clinicGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.82rem' }} />
                <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Clinics Overview Table */}
      <motion.div className="chart-card" {...c(6)}>
        <h3 className="chart-title"><Heart size={18} /> Clinics Overview</h3>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Clinic</th><th>Plan</th><th>Status</th><th>Patients Today</th><th>Revenue</th></tr></thead>
            <tbody>
              {clinics.map(cl => (
                <tr key={cl.id}>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 34, height: 34, borderRadius: 8, background: cl.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>{cl.initials}</div><div><div style={{ fontWeight: 600 }}>{cl.name}</div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cl.address.split(',')[0]}</div></div></div></td>
                  <td><span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>{cl.plan}</span></td>
                  <td><span className={`badge ${cl.status === 'active' ? 'badge-green' : 'badge-amber'}`}><span className="badge-dot" />{cl.status === 'active' ? 'Active' : 'Trial'}</span></td>
                  <td style={{ fontWeight: 600 }}>{cl.patientsToday}</td>
                  <td style={{ fontWeight: 600 }}>${cl.monthlyFee}/mo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
