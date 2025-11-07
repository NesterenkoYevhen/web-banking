function calculateAge(day: number, month: number, year: number): number {
  const now = new Date();
  const birthdate = new Date(year, month - 1, day);
  let age = now.getFullYear() - birthdate.getFullYear();
  const monthDiff = now.getMonth() - birthdate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
}

export default calculateAge;
