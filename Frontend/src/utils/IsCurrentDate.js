
export const IsCurrentDate = (expirationDateStr) => {
  // Convert the expirationDate string to a Date object
  const expirationDate = new Date(expirationDateStr);

  // Get the current date
  const currentDate = new Date();

  // Compare the two dates
  console.log(currentDate)
  return (
    expirationDate.getDate() === currentDate.getDate() &&
    expirationDate.getMonth() === currentDate.getMonth() &&
    expirationDate.getFullYear() === currentDate.getFullYear()
  );
};