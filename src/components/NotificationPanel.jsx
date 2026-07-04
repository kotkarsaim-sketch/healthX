import { Bell, X } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationPanel() {
  const { notifications, unreadCount, markAllRead } = useQueue();
  const [open, setOpen] = useState(false);

  const sevColors = { success: 'var(--accent)', warning: 'var(--warning)', error: 'var(--danger)', info: 'var(--primary)' };

  return (
    <>
      <button className="btn-icon btn-ghost notif-bell" onClick={() => { setOpen(true); markAllRead(); }}>
        <Bell size={22} />
        {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div className="modal" initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Notifications</h2>
                <button className="btn-icon btn-ghost" onClick={() => setOpen(false)}><X size={20} /></button>
              </div>
              {notifications.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 24 }}>No notifications yet</p>}
              {notifications.map(n => (
                <div key={n.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: sevColors[n.severity], marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{n.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>{n.message}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>{n.timestamp.toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
