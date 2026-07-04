import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, UserCog, BarChart3, Settings } from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import { useAuth } from '../context/AuthContext';
import { clinics } from '../utils/mockData';

export default function ClinicSidebar() {
  const { user } = useAuth();
  const clinic = clinics.find(c => c.id === user?.clinicId);
  const links = [
    { to: '/clinic', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/clinic/queue', icon: ListOrdered, label: 'Queue Control' },
    { to: '/clinic/doctors', icon: UserCog, label: 'Doctors' },
    { to: '/clinic/reports', icon: BarChart3, label: 'Reports' },
    { to: '/clinic/settings', icon: Settings, label: 'Settings' },
  ];
  return (
    <SidebarLayout title={clinic?.name || 'Clinic'} subtitle="Clinic Admin" accent={clinic?.color || '#2563EB'}
      items={links.map(l => (
        <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
          <l.icon size={19} /><span>{l.label}</span>
        </NavLink>
      ))}>
      <Outlet />
    </SidebarLayout>
  );
}
