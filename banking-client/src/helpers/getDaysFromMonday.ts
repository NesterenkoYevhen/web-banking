function getDaysFromMonday(): number {
  const today = new Date();
  let dayOfWeek = today.getDay();
  dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
  const daysSinceMonday = dayOfWeek;
  return daysSinceMonday;
}

export default getDaysFromMonday;