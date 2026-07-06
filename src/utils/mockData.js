// ===== CLINICS =====
export const clinics = [
  { id: 'clinic-1', name: 'City Health Clinic', initials: 'CH', color: '#2563EB', address: '123 Healthcare Ave, Medical District, NY 10001', phone: '+1 (555) 234-5678', email: 'info@cityhealth.care', plan: 'enterprise', status: 'active', joinedDate: '2024-08-15', trialEnd: null, monthlyFee: 199, patientsToday: 35, totalPatients: 2840, parkingSpots: 45, parkingAvailable: 18, amenities: ['Free Wi-Fi','Cafeteria','Pharmacy','Wheelchair Access','Children Play Area','Prayer Room'], hours: { 'Monday - Friday': '8:00 AM – 8:00 PM', Saturday: '9:00 AM – 5:00 PM', Sunday: '10:00 AM – 2:00 PM' } },
  { id: 'clinic-2', name: 'Green Valley Medical', initials: 'GV', color: '#10B981', address: '456 Wellness Blvd, Green Valley, CA 90210', phone: '+1 (555) 876-5432', email: 'contact@greenvalley.med', plan: 'pro', status: 'active', joinedDate: '2025-01-10', trialEnd: null, monthlyFee: 99, patientsToday: 22, totalPatients: 1560, parkingSpots: 30, parkingAvailable: 12, amenities: ['Free Wi-Fi','Pharmacy','Wheelchair Access'], hours: { 'Monday - Friday': '9:00 AM – 6:00 PM', Saturday: '9:00 AM – 2:00 PM', Sunday: 'Closed' } },
  { id: 'clinic-3', name: 'Sunrise Family Care', initials: 'SF', color: '#F59E0B', address: '789 Sunrise Rd, Downtown, TX 75001', phone: '+1 (555) 345-6789', email: 'hello@sunrisefamily.care', plan: 'basic', status: 'trial', joinedDate: '2026-06-20', trialEnd: '2026-07-20', monthlyFee: 49, patientsToday: 14, totalPatients: 420, parkingSpots: 20, parkingAvailable: 8, amenities: ['Free Wi-Fi','Wheelchair Access'], hours: { 'Monday - Friday': '8:30 AM – 5:30 PM', Saturday: '10:00 AM – 1:00 PM', Sunday: 'Closed' } },
];

// Default clinic info for patient view
export const clinicInfo = clinics[0];

// ===== DOCTORS (per clinic) =====
export const doctors = [
  { id: 'd1', clinicId: 'clinic-1', name: 'Dr. Sarah Mitchell', specialty: 'General Physician', department: 'General Medicine', experience: 12, rating: 4.8, avgConsultTime: 12, workingHours: '9:00 AM – 5:00 PM', status: 'available', patientsToday: 14, completedToday: 9 },
  { id: 'd2', clinicId: 'clinic-1', name: 'Dr. James Carter', specialty: 'Cardiologist', department: 'Cardiology', experience: 18, rating: 4.9, avgConsultTime: 15, workingHours: '10:00 AM – 6:00 PM', status: 'available', patientsToday: 11, completedToday: 6 },
  { id: 'd3', clinicId: 'clinic-1', name: 'Dr. Priya Sharma', specialty: 'Dermatologist', department: 'Dermatology', experience: 8, rating: 4.7, avgConsultTime: 10, workingHours: '9:30 AM – 4:30 PM', status: 'break', patientsToday: 10, completedToday: 7 },
  { id: 'd4', clinicId: 'clinic-2', name: 'Dr. Michael Chen', specialty: 'Pediatrician', department: 'Pediatrics', experience: 15, rating: 4.9, avgConsultTime: 14, workingHours: '8:00 AM – 3:00 PM', status: 'available', patientsToday: 12, completedToday: 8 },
  { id: 'd5', clinicId: 'clinic-2', name: 'Dr. Emily Ross', specialty: 'General Physician', department: 'General Medicine', experience: 10, rating: 4.6, avgConsultTime: 11, workingHours: '9:00 AM – 5:00 PM', status: 'available', patientsToday: 10, completedToday: 5 },
  { id: 'd6', clinicId: 'clinic-3', name: 'Dr. Ahmed Khan', specialty: 'Family Medicine', department: 'Family Care', experience: 20, rating: 4.8, avgConsultTime: 13, workingHours: '8:30 AM – 4:30 PM', status: 'available', patientsToday: 8, completedToday: 4 },
  { id: 'd7', clinicId: 'clinic-3', name: 'Dr. Lisa Park', specialty: 'Internal Medicine', department: 'Internal Med', experience: 6, rating: 4.5, avgConsultTime: 12, workingHours: '9:00 AM – 5:00 PM', status: 'late', patientsToday: 6, completedToday: 2 },
];

// ===== PATIENTS GENERATOR =====
const firstNames = ['Aarav','Sophia','Liam','Zara','Noah','Mia','Ethan','Aisha','Lucas','Emma','Oliver','Fatima','Arjun','Isabella','Omar','Chloe','Ravi','Grace','Yusuf','Hannah','Kabir','Lily','Ali','Amara','Daniel','Sara','David','Noor','Sam','Priya','Ben','Maya','Jack','Layla','Leo','Hana'];
const lastNames = ['Patel','Johnson','Ahmed','Williams','Singh','Brown','Khan','Davis','Gupta','Wilson','Sharma','Anderson','Ali','Thomas','Kumar','Martin','Shah','Lee','Verma','Chen'];

export function generatePatients(count = 35, clinicId = 'clinic-1') {
  const patients = [];
  for (let i = 1; i <= count; i++) {
    const fn = firstNames[(i * 3 + clinicId.charCodeAt(7)) % firstNames.length];
    const ln = lastNames[(i * 7 + clinicId.charCodeAt(7)) % lastNames.length];
    const hour = 9 + Math.floor(i / 4);
    const min = (i * 7) % 60;
    patients.push({
      id: `${clinicId}-p${i}`, token: i, name: `${fn} ${ln}`, age: 18 + ((i * 13) % 55),
      phone: `+1-${String(100 + (i * 3) % 900)}-${String(1000 + (i * 7) % 9000)}`,
      appointmentTime: `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`,
      status: i <= 8 ? 'completed' : i === 9 ? 'in-progress' : 'waiting',
      clinicId, doctorId: clinicId === 'clinic-1' ? 'd1' : clinicId === 'clinic-2' ? 'd4' : 'd6',
      checkInTime: i <= 12 ? `${String(8 + Math.floor(i / 3)).padStart(2, '0')}:${String((i * 11) % 60).padStart(2, '0')}` : null,
      consultDuration: i <= 8 ? 8 + (i % 8) : null,
      notes: i <= 8 ? 'Routine checkup completed.' : '',
    });
  }
  return patients;
}

// ===== DEMO ACCOUNTS =====
export const demoAccounts = [
  { id: 'super-1', name: 'Platform Admin', email: 'admin@queuecare.io', role: 'super', clinicId: null, avatar: 'PA' },
  { id: 'cadmin-1', name: 'Reception Staff', email: 'staff@cityhealth.care', role: 'clinic-admin', clinicId: 'clinic-1', avatar: 'RS' },
  { id: 'd1', name: 'Dr. Sarah Mitchell', email: 'sarah@cityhealth.care', role: 'doctor', clinicId: 'clinic-1', avatar: 'SM' },
  { id: 'patient-1', name: 'Alex Thompson', email: 'alex@email.com', role: 'patient', clinicId: 'clinic-1', avatar: 'AT', token: 18 },
];

export const currentUser = demoAccounts[3]; // default patient

// ===== SUBSCRIPTION PLANS =====
export const plans = [
  { id: 'basic', name: 'Basic', price: 49, yearlyPrice: 470, features: ['Up to 2 doctors', 'Basic queue management', 'Email notifications', '100 patients/month'], color: '#64748B' },
  { id: 'pro', name: 'Pro', price: 99, yearlyPrice: 950, features: ['Up to 8 doctors', 'AI wait prediction', 'SMS + Push notifications', 'Unlimited patients', 'Analytics dashboard', 'Priority support'], color: '#2563EB', popular: true },
  { id: 'enterprise', name: 'Enterprise', price: 199, yearlyPrice: 1900, features: ['Unlimited doctors', 'AI wait prediction', 'All notification channels', 'Unlimited patients', 'Advanced analytics', 'Custom branding', 'API access', 'Dedicated support'], color: '#8B5CF6' },
];

// ===== PLATFORM ANALYTICS =====
export const platformStats = {
  totalClinics: 3, activeClinics: 2, trialClinics: 1,
  totalPatients: 4820, monthlyRevenue: 497, yearlyRevenue: 5470,
  avgWaitPlatform: 18, totalDoctors: 7,
  revenueHistory: [
    { month: 'Jan', revenue: 298 }, { month: 'Feb', revenue: 298 }, { month: 'Mar', revenue: 397 },
    { month: 'Apr', revenue: 397 }, { month: 'May', revenue: 497 }, { month: 'Jun', revenue: 497 },
    { month: 'Jul', revenue: 497 },
  ],
  clinicGrowth: [
    { month: 'Jan', count: 1 }, { month: 'Feb', count: 1 }, { month: 'Mar', count: 2 },
    { month: 'Apr', count: 2 }, { month: 'May', count: 2 }, { month: 'Jun', count: 3 },
    { month: 'Jul', count: 3 },
  ],
};

export const historicalData = {
  hourlyPatients: [
    { hour: '8AM', count: 4 }, { hour: '9AM', count: 8 }, { hour: '10AM', count: 12 },
    { hour: '11AM', count: 15 }, { hour: '12PM', count: 10 }, { hour: '1PM', count: 6 },
    { hour: '2PM', count: 11 }, { hour: '3PM', count: 14 }, { hour: '4PM', count: 9 },
    { hour: '5PM', count: 5 },
  ],
  avgWaitByHour: [
    { hour: '8AM', wait: 8 }, { hour: '9AM', wait: 15 }, { hour: '10AM', wait: 28 },
    { hour: '11AM', wait: 40 }, { hour: '12PM', wait: 22 }, { hour: '1PM', wait: 12 },
    { hour: '2PM', wait: 25 }, { hour: '3PM', wait: 35 }, { hour: '4PM', wait: 18 },
    { hour: '5PM', wait: 10 },
  ],
  dailyTrend: [
    { day: 'Mon', patients: 32, avgWait: 22 }, { day: 'Tue', patients: 28, avgWait: 18 },
    { day: 'Wed', patients: 35, avgWait: 25 }, { day: 'Thu', patients: 30, avgWait: 20 },
    { day: 'Fri', patients: 38, avgWait: 28 }, { day: 'Sat', patients: 20, avgWait: 14 },
  ],
};

export const doctorStatuses = {
  available: { label: 'Available', color: 'green', icon: '🟢' },
  late: { label: 'Running Late', color: 'amber', icon: '🟡' },
  emergency: { label: 'In Emergency', color: 'red', icon: '🔴' },
  break: { label: 'On Break', color: 'gray', icon: '⏸️' },
  closed: { label: 'Clinic Closed', color: 'gray', icon: '🔒' },
};
