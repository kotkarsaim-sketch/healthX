import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Building2, CreditCard, BarChart3, Settings } from 'lucide-react';
import SidebarLayout from './SidebarLayout';

const links = [
  { to: '/super', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/super/clinics', icon: Building2, label: 'Clinics' },
  { to: '/super/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  { to: '/super/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function SuperSidebar() {
  return (
    <SidebarLayout title="QueueCare" subtitle="Super Admin" accent="#8B5CF6"
      items={links.map(l => (
        <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
          <l.icon size={19} /><span>{l.label}</span>
        </NavLink>
      ))}>
      <Outlet />
    </SidebarLayout>
  );
}
