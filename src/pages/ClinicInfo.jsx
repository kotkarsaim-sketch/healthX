import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Car, Star, Wifi, Coffee, Pill, Baby, Accessibility, Heart } from 'lucide-react';
import { clinicInfo, doctors } from '../utils/mockData';

const amenityIcons = { 'Free Wi-Fi': Wifi, 'Cafeteria': Coffee, 'Pharmacy': Pill, 'Wheelchair Access': Accessibility, 'Children Play Area': Baby, 'Prayer Room': Heart };
const card = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.07 } });

export default function ClinicInfo() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Clinic Info</h1>
        <p className="page-subtitle">{clinicInfo.name}</p>
      </div>

      {/* Contact Card */}
      <motion.div className="card" {...card(0)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <MapPin size={18} color="var(--primary)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{clinicInfo.address}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Phone size={18} color="var(--accent)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{clinicInfo.phone}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mail size={18} color="var(--warning)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{clinicInfo.email}</span>
        </div>
      </motion.div>

      <div className="spacer" />

      {/* Working Hours */}
      <motion.div className="card" {...card(1)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Clock size={18} color="var(--primary)" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Working Hours</span>
        </div>
        {Object.entries(clinicInfo.hours).map(([day, hours]) => (
          <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600 }}>{day}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{hours}</span>
          </div>
        ))}
      </motion.div>

      <div className="spacer" />

      {/* Parking */}
      <motion.div className="card" {...card(2)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Car size={18} color="var(--accent)" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Parking</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{clinicInfo.parkingAvailable}</div>
            <div className="card-desc">spots available of {clinicInfo.parkingSpots}</div>
          </div>
          <div className="badge badge-green"><span className="badge-dot" /> Available</div>
        </div>
        <div className="spacer-sm" />
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(1 - clinicInfo.parkingAvailable / clinicInfo.parkingSpots) * 100}%`, background: 'linear-gradient(90deg, var(--accent), var(--warning))' }} />
        </div>
      </motion.div>

      <div className="spacer" />

      {/* Amenities */}
      <motion.div className="card" {...card(3)}>
        <div className="section-title">Amenities</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {clinicInfo.amenities.map(a => {
            const Icon = amenityIcons[a] || Heart;
            return (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--primary-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 600 }}>
                <Icon size={16} color="var(--primary)" /> {a}
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="spacer" />

      {/* Doctors */}
      <div className="section-title">Our Doctors</div>
      {doctors.map((doc, i) => (
        <motion.div className="card" key={doc.id} {...card(4 + i)} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-bg), var(--accent-bg))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)', flexShrink: 0 }}>
              {doc.name.split(' ').map(n => n[0]).slice(1).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{doc.name}</div>
              <div className="card-desc">{doc.specialty} • {doc.department}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', fontWeight: 600 }}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" /> {doc.rating}
                </span>
                <span className="card-desc">{doc.experience} yrs exp</span>
                <span className="card-desc">{doc.workingHours}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
