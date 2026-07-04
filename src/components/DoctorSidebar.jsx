import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Calendar } from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import { useAuth } from '../context/AuthContext';

export default function DoctorSidebar() {
  const { user } = useAuth();
  const links = [
    { to: '/doctor', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/doctor/consultation', icon: ClipboardList, label: 'Consultation' },
    { to: '/doctor/schedule', icon: Calendar, label: 'Schedule' },
  ];
  return (
    <SidebarLayout title={user?.name || 'Doctor'} subtitle="Doctor Panel" accent="#10B981"
      items={links.map(l => (
        <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
          <l.icon size={19} /><span>{l.label}</span>
        </NavLink>
      ))}>
      <Outlet />
    </SidebarLayout>
  );
}
