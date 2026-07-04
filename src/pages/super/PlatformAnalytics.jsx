import { motion } from 'framer-motion';
import { BarChart3, Clock, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { clinics, historicalData } from '../../utils/mockData';

const c = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } });

const clinicComparison = clinics.map(cl => ({ name: cl.initials, patients: cl.patientsToday, revenue: cl.monthlyFee }));
const peakData = [
  { time: '8AM', 'City Health': 4, 'Green Valley': 2, 'Sunrise': 1 },
  { time: '10AM', 'City Health': 12, 'Green Valley': 8, 'Sunrise': 5 },
  { time: '12PM', 'City Health': 10, 'Green Valley': 6, 'Sunrise': 4 },
  { time: '2PM', 'City Health': 11, 'Green Valley': 7, 'Sunrise': 3 },
  { time: '4PM', 'City Health': 9, 'Green Valley': 5, 'Sunrise': 2 },
];

export default function PlatformAnalytics() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Platform Analytics</h1>
          <p className="admin-subtitle">Cross-clinic performance insights</p>
        </div>
      </div>

      <div className="chart-grid">
        <motion.div className="chart-card" {...c(0)}>
          <h3 className="chart-title"><Users size={18} /> Patients by Clinic</h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={clinicComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                <Bar dataKey="patients" fill="#2563EB" radius={[4, 4, 0, 0]} name="Patients Today" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <motion.div className="chart-card" {...c(1)}>
          <h3 className="chart-title"><TrendingUp size={18} /> Peak Hours Comparison</h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={peakData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                <Line type="monotone" dataKey="City Health" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Green Valley" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Sunrise" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div className="chart-card" {...c(2)}>
        <h3 className="chart-title"><Clock size={18} /> Avg Wait Time by Hour (All Clinics)</h3>
        <div style={{ width: '100%', height: 240 }}>
          <ResponsiveContainer>
            <BarChart data={historicalData.avgWaitByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} unit="m" />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
              <Bar dataKey="wait" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Avg Wait (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
