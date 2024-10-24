// Function to get the current date and time in a formatted string
function getCurrentDateTime() {
  const now = new Date(); // Get the current date and time

  const year = now.getFullYear(); // Get the full year
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so +1) and pad with zero
  const day = String(now.getDate()).padStart(2, "0"); // Get the day of the month and pad with zero

  const hours = String(now.getHours()).padStart(2, "0"); // Get the hours and pad with zero
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Get the minutes and pad with zero
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Get the seconds and pad with zero

  // Format the date and time as YYYY-MM-DD HH:mm:ss
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage

// Export the function for use in other modules
module.exports = getCurrentDateTime; // Export the function
