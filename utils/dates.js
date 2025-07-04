

export function formatTime(dateString) {
  const date = new Date(dateString)
  let day = String(date.getDate()).padStart(2,"0");
  let month = String(date.getMonth()+1).padStart(2,"0");
  let year = date.getFullYear();

  let returnDate = `${day}-${month}-${year}`;
  return returnDate;
}