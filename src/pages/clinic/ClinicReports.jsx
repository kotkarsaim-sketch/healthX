import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, Clock, Users } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { historicalData } from '../../utils/mockData';

const c = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } });

export default function ClinicReports() {
  const { analytics } = useQueue();
  const [period, setPeriod] = useState('daily');

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Reports & Analytics</h1>
          <p className="admin-subtitle">Clinic performance insights</p>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['daily', 'weekly', 'monthly'].map(p => (
            <button key={p} className={`btn btn-sm ${period === p ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setPeriod(p)} style={{ textTransform: 'capitalize' }}>{p}</button>
          ))}
        </div>
      </div>

      <div className="stats-grid cols-4">
        <motion.div className="stat-card" {...c(0)}>
          <div className="stat-icon" style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}><Users size={20} /></div>
          <div className="stat-value">{analytics.totalPatients}</div>
          <div className="stat-label">Total Patients</div>
        </motion.div>
        <motion.div className="stat-card" {...c(1)}>
          <div className="stat-icon" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}><TrendingUp size={20} /></div>
          <div className="stat-value">{analytics.completionPercentage}%</div>
          <div className="stat-label">Completion Rate</div>
        </motion.div>
        <motion.div className="stat-card" {...c(2)}>
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}><Clock size={20} /></div>
          <div className="stat-value">{analytics.avgConsultTime}m</div>
          <div className="stat-label">Avg Consult</div>
        </motion.div>
        <motion.div className="stat-card" {...c(3)}>
          <div className="stat-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}><Clock size={20} /></div>
          <div className="stat-value">{analytics.avgWaitTime}m</div>
          <div className="stat-label">Avg Wait</div>
        </motion.div>
      </div>

      <div className="chart-grid">
        <motion.div className="chart-card" {...c(4)}>
          <h3 className="chart-title"><Users size={18} /> Hourly Patient Volume</h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={historicalData.hourlyPatients}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <motion.div className="chart-card" {...c(5)}>
          <h3 className="chart-title"><Clock size={18} /> Avg Wait Time by Hour</h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={historicalData.avgWaitByHour}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} unit="m" />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                <Bar dataKey="wait" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div className="chart-card" {...c(6)}>
        <h3 className="chart-title"><Calendar size={18} /> Daily Queue Trends</h3>
        <div style={{ width: '100%', height: 240 }}>
          <ResponsiveContainer>
            <LineChart data={historicalData.dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
              <Line type="monotone" dataKey="patients" stroke="#2563EB" strokeWidth={2} name="Patients" />
              <Line type="monotone" dataKey="avgWait" stroke="#F59E0B" strokeWidth={2} name="Avg Wait (m)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
