export function calculateEstimatedWait(patientsAhead, avgConsultTime, doctorSpeedFactor = 1, delayMinutes = 0) {
  if (patientsAhead <= 0) return 0;
  const adjustedAvg = avgConsultTime / doctorSpeedFactor;
  const baseWait = patientsAhead * adjustedAvg;
  const varianceFactor = 1 + (Math.random() * 0.1 - 0.05);
  return Math.max(0, Math.round((baseWait + delayMinutes) * varianceFactor));
}

export function predictPeakHours(hourlyData) {
  const avg = hourlyData.reduce((s, d) => s + d.count, 0) / hourlyData.length;
  return hourlyData.map(d => ({ ...d, isPeak: d.count > avg * 1.2, level: d.count > avg * 1.4 ? 'high' : d.count > avg * 1.2 ? 'medium' : 'low' }));
}

export function suggestBestSlots(hourlyData) {
  const sorted = [...hourlyData].sort((a, b) => a.count - b.count);
  return sorted.slice(0, 3).map(d => ({ ...d, recommendation: `Low traffic at ${d.hour}` }));
}

export function detectUnusualDelay(currentAvgWait, historicalAvgWait) {
  const ratio = currentAvgWait / historicalAvgWait;
  if (ratio > 1.5) return { isDelayed: true, severity: 'high', message: 'Significant delays detected' };
  if (ratio > 1.2) return { isDelayed: true, severity: 'medium', message: 'Moderate delays today' };
  return { isDelayed: false, severity: 'low', message: 'Running on schedule' };
}

export function getQueueAnalytics(patients) {
  const completed = patients.filter(p => p.status === 'completed');
  const waiting = patients.filter(p => p.status === 'waiting');
  const totalDuration = completed.reduce((s, p) => s + (p.consultDuration || 0), 0);
  const avgConsult = completed.length > 0 ? Math.round(totalDuration / completed.length) : 0;
  const completionPct = Math.round((completed.length / patients.length) * 100);
  return { totalPatients: patients.length, completed: completed.length, waiting: waiting.length, inProgress: patients.filter(p => p.status === 'in-progress').length, avgConsultTime: avgConsult, completionPercentage: completionPct, avgWaitTime: Math.round(avgConsult * 1.8) };
}
