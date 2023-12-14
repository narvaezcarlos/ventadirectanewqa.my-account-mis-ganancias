export const formatDate = (date: string) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0")
  const day = newDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day} `;
}

export const getMonths = (date: string) => {

  const today = new Date();
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1);
  return Math.round(
    (today.getTime() - firstDayOfMonth.getTime()) / (30 * 24 * 60 * 60 * 1000)
  );


}