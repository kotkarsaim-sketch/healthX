import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, ToggleLeft, ToggleRight, Eye, X, Building2 } from 'lucide-react';
import { clinics, doctors } from '../../utils/mockData';

export default function ClinicsManagement() {
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [list, setList] = useState(clinics);

  const filtered = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const toggleStatus = (id) => {
    setList(l => l.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Clinics Management</h1>
          <p className="admin-subtitle">{list.length} clinics registered</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}><Plus size={18} /> Add Clinic</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ position: 'relative', maxWidth: 400 }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input" placeholder="Search clinics..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 42 }} />
        </div>
      </div>

      <div className="chart-card" style={{ padding: 0 }}>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Clinic</th><th>Plan</th><th>Status</th><th>Joined</th><th>Doctors</th><th>Revenue</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(cl => (
                <tr key={cl.id}>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 8, background: cl.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.78rem' }}>{cl.initials}</div><div><div style={{ fontWeight: 600 }}>{cl.name}</div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cl.email}</div></div></div></td>
                  <td><span className="badge badge-blue">{cl.plan}</span></td>
                  <td><span className={`badge ${cl.status === 'active' ? 'badge-green' : cl.status === 'trial' ? 'badge-amber' : 'badge-red'}`}><span className="badge-dot" />{cl.status}</span></td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{cl.joinedDate}</td>
                  <td style={{ fontWeight: 600 }}>{doctors.filter(d => d.clinicId === cl.id).length}</td>
                  <td style={{ fontWeight: 600 }}>${cl.monthlyFee}/mo</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setDetail(cl)}><Eye size={14} /></button>
                      <button className="btn btn-ghost btn-sm" onClick={() => toggleStatus(cl.id)}>
                        {cl.status === 'active' ? <ToggleRight size={18} color="var(--accent)" /> : <ToggleLeft size={18} color="var(--text-muted)" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detail && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetail(null)}>
            <motion.div className="modal" initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 500, borderRadius: 'var(--radius)' }}>
              <div className="modal-header">
                <h2 className="modal-title">{detail.name}</h2>
                <button className="btn-icon btn-ghost" onClick={() => setDetail(null)}><X size={20} /></button>
              </div>
              <div style={{ display: 'grid', gap: 12, fontSize: '0.85rem' }}>
                <div><strong>Address:</strong> {detail.address}</div>
                <div><strong>Phone:</strong> {detail.phone}</div>
                <div><strong>Email:</strong> {detail.email}</div>
                <div><strong>Plan:</strong> <span className="badge badge-blue">{detail.plan}</span></div>
                <div><strong>Status:</strong> <span className={`badge ${detail.status === 'active' ? 'badge-green' : 'badge-amber'}`}>{detail.status}</span></div>
                <div><strong>Total Patients:</strong> {detail.totalPatients.toLocaleString()}</div>
                <div><strong>Doctors:</strong> {doctors.filter(d => d.clinicId === detail.id).map(d => d.name).join(', ')}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAdd(false)}>
            <motion.div className="modal" initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 480, borderRadius: 'var(--radius)' }}>
              <div className="modal-header">
                <h2 className="modal-title">Add New Clinic</h2>
                <button className="btn-icon btn-ghost" onClick={() => setShowAdd(false)}><X size={20} /></button>
              </div>
              <div className="input-group"><label className="input-label">Clinic Name</label><input className="input" placeholder="e.g. MedCare Plus" /></div>
              <div className="input-group"><label className="input-label">Email</label><input className="input" type="email" placeholder="admin@clinic.com" /></div>
              <div className="input-group"><label className="input-label">Plan</label><select className="input"><option>Basic</option><option>Pro</option><option>Enterprise</option></select></div>
              <button className="btn btn-primary btn-full" onClick={() => setShowAdd(false)}>Create Clinic</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
