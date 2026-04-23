const Icon = ({ name, className = "", filled = false, style = {} }) => (
  <span className={`material-symbols-outlined ${filled ? 'filled' : ''} ${className}`} style={style}>
    {name}
  </span>
);
