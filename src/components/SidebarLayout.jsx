import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Activity, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SidebarLayout({ children, items, title, subtitle, accent }) {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="sidebar-layout">
      <aside className="sidebar" style={{ '--sidebar-accent': accent || 'var(--primary)' }}>
        <div className="sidebar-brand">
          <div className="sidebar-logo" style={{ background: accent || 'var(--primary)' }}><Activity size={18} color="#fff" /></div>
          <div>
            <div className="sidebar-title">{title || 'QueueCare'}</div>
            <div className="sidebar-sub">{subtitle || user?.name}</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {items}
        </nav>
        <div className="sidebar-footer">
          <button className="sidebar-btn" onClick={toggle}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}<span>Theme</span></button>
          <button className="sidebar-btn" onClick={handleLogout}><LogOut size={18} /><span>Logout</span></button>
        </div>
      </aside>
      <main className="sidebar-main">
        {children}
      </main>
    </div>
  );
}
