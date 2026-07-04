export function checkNotifications(patientsAhead, prevAhead, doctorStatus, prevDoctorStatus) {
  const notifications = [];
  if (patientsAhead === 0 && prevAhead > 0) notifications.push({ type: 'turn', title: "It's Your Turn!", message: 'Please proceed to the consultation room.', severity: 'success' });
  if (patientsAhead === 3 && prevAhead === 4) notifications.push({ type: 'soon', title: '3 Patients Remaining', message: 'Please be ready near the clinic.', severity: 'info' });
  if (patientsAhead === 5 && prevAhead === 6) notifications.push({ type: 'approaching', title: '5 Patients Remaining', message: 'Your turn is approaching soon.', severity: 'info' });
  if (doctorStatus === 'late' && prevDoctorStatus === 'available') notifications.push({ type: 'delay', title: 'Doctor Delayed', message: 'The doctor is running late. Updated wait times reflected.', severity: 'warning' });
  if (doctorStatus === 'emergency' && prevDoctorStatus !== 'emergency') notifications.push({ type: 'emergency', title: 'Emergency Case', message: 'Doctor is attending an emergency. Queue is temporarily paused.', severity: 'error' });
  if (doctorStatus === 'available' && prevDoctorStatus === 'break') notifications.push({ type: 'resumed', title: 'Queue Resumed', message: 'Doctor is back. Queue is moving again.', severity: 'success' });
  return notifications;
}

export function createNotification(type, title, message, severity = 'info') {
  return { id: Date.now() + Math.random(), type, title, message, severity, timestamp: new Date(), read: false };
}
