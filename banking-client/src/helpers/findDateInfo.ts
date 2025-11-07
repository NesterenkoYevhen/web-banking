function getDateInfo() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const year = today.getFullYear();
  const startOfWeek = new Date(year, today.getMonth(), today.getDate() - dayOfWeek + 1);
  const endOfWeek = new Date(year, today.getMonth(), startOfWeek.getDate() + 6);
  const week = `${startOfWeek.toLocaleString("en-US", { day: 'numeric', month: 'short' }).split(' ').reverse().join(' ')} - ${endOfWeek.toLocaleString("en-US", { day: 'numeric', month: 'short' }).split(' ').reverse().join(' ')}`;
  
  return {
    week,
    year,
  };
}

export default getDateInfo;