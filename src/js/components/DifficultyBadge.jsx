const DifficultyBadge = ({ level }) => {
  const styles = {
    easy: "badge-easy",
    medium: "badge-medium",
    hard: "badge-hard"
  };
  const labels = { easy: "Easy", medium: "Medium", hard: "Hard" };
  return (
    <span className={`${styles[level]} text-xs font-semibold px-2 py-0.5 rounded-full font-lexend tracking-wide`}>
      {labels[level]}
    </span>
  );
};
