import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { generatePatients, doctors as allDoctors } from '../utils/mockData';
import { calculateEstimatedWait, getQueueAnalytics } from '../utils/predictions';
import { checkNotifications, createNotification } from '../utils/notifications';
import toast from 'react-hot-toast';

const QueueContext = createContext();

export function QueueProvider({ children }) {
  const [patients, setPatients] = useState(() => generatePatients(35, 'clinic-1'));
  const [currentToken, setCurrentToken] = useState(9);
  const [doctorStatus, setDoctorStatus] = useState('available');
  const [doctorDelay, setDoctorDelay] = useState(0);
  const [paused, setPaused] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const prevAheadRef = useRef(null);
  const prevStatusRef = useRef('available');

  const userToken = 18;
  const ahead = currentToken < userToken ? userToken - currentToken - 1 : 0;
  const doctor = allDoctors.find(d => d.id === 'd1');
  const estimatedWait = calculateEstimatedWait(ahead, doctor?.avgConsultTime || 12, 1, doctorDelay);
  const analytics = getQueueAnalytics(patients);
  const totalPatients = patients.length;
  const progress = Math.round((currentToken / totalPatients) * 100);

  useEffect(() => {
    if (paused || doctorStatus === 'emergency' || doctorStatus === 'break' || doctorStatus === 'closed') return;
    const interval = setInterval(() => {
      setCurrentToken(prev => {
        if (prev >= totalPatients) return prev;
        const next = prev + 1;
        setPatients(ps => ps.map(p => {
          if (p.token === prev) return { ...p, status: 'completed', consultDuration: 8 + Math.floor(Math.random() * 8) };
          if (p.token === next) return { ...p, status: 'in-progress' };
          return p;
        }));
        return next;
      });
    }, 8000 + Math.random() * 7000);
    return () => clearInterval(interval);
  }, [paused, doctorStatus, totalPatients]);

  useEffect(() => {
    if (prevAheadRef.current === null) { prevAheadRef.current = ahead; prevStatusRef.current = doctorStatus; return; }
    const newNotifs = checkNotifications(ahead, prevAheadRef.current, doctorStatus, prevStatusRef.current);
    if (newNotifs.length > 0) {
      const mapped = newNotifs.map(n => createNotification(n.type, n.title, n.message, n.severity));
      setNotifications(prev => [...mapped, ...prev]);
      setUnreadCount(c => c + mapped.length);
      newNotifs.forEach(n => {
        if (n.severity === 'success') toast.success(n.title);
        else if (n.severity === 'error') toast.error(n.title);
        else if (n.severity === 'warning') toast(n.title, { icon: '⚠️' });
        else toast(n.title, { icon: 'ℹ️' });
      });
    }
    prevAheadRef.current = ahead;
    prevStatusRef.current = doctorStatus;
  }, [ahead, doctorStatus]);

  const markAllRead = useCallback(() => { setNotifications(ns => ns.map(n => ({ ...n, read: true }))); setUnreadCount(0); }, []);

  const completePatient = useCallback((token) => {
    setPatients(ps => ps.map(p => p.token === token ? { ...p, status: 'completed', consultDuration: 8 + Math.floor(Math.random() * 8) } : p));
    setCurrentToken(prev => {
      const next = prev + 1;
      setPatients(ps => ps.map(p => p.token === next ? { ...p, status: 'in-progress' } : p));
      return next;
    });
  }, []);

  const skipPatient = useCallback((token) => { setPatients(ps => ps.map(p => p.token === token ? { ...p, status: 'skipped' } : p)); }, []);

  const addPatient = useCallback((name) => {
    const newToken = patients.length + 1;
    setPatients(ps => [...ps, { id: `clinic-1-p${newToken}`, token: newToken, name, age: 30, phone: '+1-555-0000', appointmentTime: '--:--', status: 'waiting', clinicId: 'clinic-1', doctorId: 'd1', checkInTime: null, consultDuration: null, notes: '' }]);
  }, [patients.length]);

  const changeDoctorStatus = useCallback((status, delay = 0) => {
    setDoctorStatus(status);
    setDoctorDelay(delay);
    if (status === 'emergency' || status === 'break') setPaused(true);
    if (status === 'available') setPaused(false);
  }, []);

  const togglePause = useCallback(() => setPaused(p => !p), []);

  return (
    <QueueContext.Provider value={{ patients, currentToken, userToken, ahead, doctor, doctorStatus, doctorDelay, estimatedWait, analytics, progress, totalPatients, paused, notifications, unreadCount, markAllRead, completePatient, skipPatient, addPatient, changeDoctorStatus, togglePause, doctors: allDoctors.filter(d => d.clinicId === 'clinic-1'), currentUser: { id: 'patient-1', name: 'Alex Thompson', token: 18, doctorId: 'd1', appointmentTime: '11:30', department: 'General Medicine' } }}>
      {children}
    </QueueContext.Provider>
  );
}

export const useQueue = () => useContext(QueueContext);
