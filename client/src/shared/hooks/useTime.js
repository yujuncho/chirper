const showElapsedTime = timestamp => {
  if (typeof timestamp !== "number") return "NaN";

  const SECOND = 1000;
  const MINUTE = 1000 * 60;
  const HOUR = 1000 * 60 * 60;
  const DAY = 1000 * 60 * 60 * 24;

  const elapsed = Date.now() - timestamp;

  if (elapsed <= MINUTE) return `${Math.round(elapsed / SECOND)}s`;
  if (elapsed <= HOUR) return `${Math.round(elapsed / MINUTE)}m`;
  if (elapsed <= DAY) return `${Math.round(elapsed / HOUR)}h`;
  return new Date(timestamp).toLocaleString("en-us", {
    month: "short",
    day: "numeric"
  });
};

export default function useTime() {
  return {
    showElapsedTime
  };
}
