

export function formatTime(dateString) {
  const date = new Date(dateString)
  let day = String(date.getDate()).padStart(2,"0");
  let month = String(date.getMonth()+1).padStart(2,"0");
  let year = date.getFullYear();

  let returnDate = `${day}-${month}-${year}`;
  return returnDate;
}

export function deliveryDate(dateString) {
   const date = new Date(dateString)
   date.setDate(date.getDate() + 7);
   const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   let dayOfWeek = date.getDay()
   let day = String(date.getDate()).padStart(2,"0");
  let month = String(date.getMonth()+1).padStart(2,"0");
  let year = date.getFullYear();

  let returnDate = `${dayNames[dayOfWeek]} ${day}-${month}-${year}`;
  return returnDate;

}