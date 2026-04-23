const ProgressRing = ({ percent, size = 60, stroke = 5, color = "#1a365d" }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5eeff" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="progress-ring"
      />
      <text x={size / 2} y={size / 2} textAnchor="middle" dy="0.35em" style={{ fontSize: size * 0.22, fontFamily: 'Lexend', fontWeight: 600, fill: color }}>
        {Math.round(percent)}%
      </text>
    </svg>
  );
};
