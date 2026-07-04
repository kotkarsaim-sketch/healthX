import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QueueProvider } from './context/QueueContext';
import ProtectedRoute from './components/ProtectedRoute';
import BottomNav from './components/BottomNav';
import SuperSidebar from './components/SuperSidebar';
import ClinicSidebar from './components/ClinicSidebar';
import DoctorSidebar from './components/DoctorSidebar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QueueTracker from './pages/QueueTracker';
import Appointments from './pages/Appointments';
import ClinicInfo from './pages/ClinicInfo';

import SuperDashboard from './pages/super/SuperDashboard';
import ClinicsManagement from './pages/super/ClinicsManagement';
import Subscriptions from './pages/super/Subscriptions';
import PlatformAnalytics from './pages/super/PlatformAnalytics';

import ClinicDashboard from './pages/clinic/ClinicDashboard';
import QueueControl from './pages/clinic/QueueControl';
import DoctorManagement from './pages/clinic/DoctorManagement';
import ClinicReports from './pages/clinic/ClinicReports';
import ClinicSettings from './pages/clinic/ClinicSettings';

import DoctorDashboard from './pages/doctor/DoctorDashboard';
import ConsultationView from './pages/doctor/ConsultationView';
import DoctorSchedule from './pages/doctor/DoctorSchedule';

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000, style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font)', fontSize: '0.85rem', fontWeight: 600, boxShadow: 'var(--shadow-lg)' } }} />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to={user.role === 'super' ? '/super' : user.role === 'clinic-admin' ? '/clinic' : user.role === 'doctor' ? '/doctor' : '/'} replace /> : <Login />} />

          {/* Super Admin */}
          <Route path="/super" element={<ProtectedRoute roles={['super']}><SuperSidebar /></ProtectedRoute>}>
            <Route index element={<SuperDashboard />} />
            <Route path="clinics" element={<ClinicsManagement />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="analytics" element={<PlatformAnalytics />} />
          </Route>

          {/* Clinic Admin */}
          <Route path="/clinic" element={<ProtectedRoute roles={['clinic-admin']}><ClinicSidebar /></ProtectedRoute>}>
            <Route index element={<ClinicDashboard />} />
            <Route path="queue" element={<QueueControl />} />
            <Route path="doctors" element={<DoctorManagement />} />
            <Route path="reports" element={<ClinicReports />} />
            <Route path="settings" element={<ClinicSettings />} />
          </Route>

          {/* Doctor */}
          <Route path="/doctor" element={<ProtectedRoute roles={['doctor']}><DoctorSidebar /></ProtectedRoute>}>
            <Route index element={<DoctorDashboard />} />
            <Route path="consultation" element={<ConsultationView />} />
            <Route path="schedule" element={<DoctorSchedule />} />
          </Route>

          {/* Patient */}
          <Route path="/" element={<ProtectedRoute roles={['patient']}><PatientLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="queue" element={<QueueTracker />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="clinic" element={<ClinicInfo />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function PatientLayout() {
  return (
    <>
      <div className="app-layout"><Outlet /></div>
      <BottomNav />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueueProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueueProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
