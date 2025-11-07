function calculateDate(date: Date) {
  let [weekday, month, day, year, , time] = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false
  }).split(" ");

  weekday = weekday.slice(0, -1)
  day = day.slice(0, -1)

  return {
    weekday, month, day, year, time
  }
};

export default calculateDate;