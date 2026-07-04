import { motion } from 'framer-motion';
import { CreditCard, Check } from 'lucide-react';
import { plans, clinics } from '../../utils/mockData';

const c = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } });

export default function Subscriptions() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Subscriptions</h1>
          <p className="admin-subtitle">Manage plans and billing</p>
        </div>
      </div>

      {/* Plans */}
      <div className="plans-grid">
        {plans.map((plan, i) => (
          <motion.div key={plan.id} className={`plan-card${plan.popular ? ' popular' : ''}`} {...c(i)}>
            {plan.popular && <div className="plan-badge">Most Popular</div>}
            <div className="plan-name" style={{ color: plan.color }}>{plan.name}</div>
            <div className="plan-price">${plan.price}<span>/mo</span></div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>${plan.yearlyPrice}/yr billed annually</div>
            <ul className="plan-features">
              {plan.features.map(f => <li key={f}><Check size={15} color="var(--accent)" /> {f}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Billing Table */}
      <motion.div className="chart-card" {...c(3)} style={{ marginTop: 24 }}>
        <h3 className="chart-title"><CreditCard size={18} /> Clinic Subscriptions</h3>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Clinic</th><th>Plan</th><th>Status</th><th>Monthly</th><th>Next Billing</th><th>Trial End</th></tr></thead>
            <tbody>
              {clinics.map(cl => (
                <tr key={cl.id}>
                  <td style={{ fontWeight: 600 }}>{cl.name}</td>
                  <td><span className="badge badge-blue">{cl.plan}</span></td>
                  <td><span className={`badge ${cl.status === 'active' ? 'badge-green' : 'badge-amber'}`}><span className="badge-dot" />{cl.status}</span></td>
                  <td style={{ fontWeight: 600 }}>${cl.monthlyFee}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{cl.status === 'trial' ? '—' : '2026-08-01'}</td>
                  <td style={{ fontSize: '0.82rem', color: cl.trialEnd ? 'var(--warning)' : 'var(--text-muted)' }}>{cl.trialEnd || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
