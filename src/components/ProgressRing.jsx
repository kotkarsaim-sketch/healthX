export default function ProgressRing({ value = 0, size = 120, stroke = 10, color = '#2563EB', label, sublabel }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        {label && <div style={{ fontSize: size * 0.22, fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>{label}</div>}
        {sublabel && <div style={{ fontSize: size * 0.1, color: 'var(--text-muted)', fontWeight: 600 }}>{sublabel}</div>}
      </div>
    </div>
  );
}
