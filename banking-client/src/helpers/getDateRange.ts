function getDateRange(days: number): string {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000);
  const currentDateString = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const pastDateString = pastDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return `${pastDateString} - ${currentDateString}`;
}

export default getDateRange;