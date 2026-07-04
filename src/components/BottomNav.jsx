import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, CalendarPlus, Building2 } from 'lucide-react';

const items = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/queue', icon: ListOrdered, label: 'Queue' },
  { to: '/appointments', icon: CalendarPlus, label: 'Book' },
  { to: '/clinic', icon: Building2, label: 'Clinic' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <Icon size={22} strokeWidth={2} />
          <span className="nav-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
