let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 10; // Start from 40 seconds

// countdown
let timer = setInterval(function() {
  // Decrease the seconds
  seconds--;

  // Calculate minutes, hours, and days based on remaining seconds
  minutes = Math.floor(seconds / 60);
  hours = Math.floor(minutes / 60);
  days = Math.floor(hours / 24);

  // Adjust the display values to show the correct countdown
  let displaySeconds = seconds % 60;
  let displayMinutes = minutes % 60;
  let displayHours = hours % 24;

  // Display
  document.getElementById("timer").innerHTML =
    "<div class=\"days\"> \
      <div class=\"numbers\">" + days + "</div>days</div> \
    <div class=\"hours\"> \
      <div class=\"numbers\">" + displayHours + "</div>hours</div> \
    <div class=\"minutes\"> \
      <div class=\"numbers\">" + displayMinutes + "</div>minutes</div> \
    <div class=\"seconds\"> \
      <div class=\"numbers\">" + displaySeconds + "</div>seconds</div> \
    </div>";

  // Stop the timer when it reaches 0
  if (seconds <= 0) {
    clearInterval(timer);
  }
}, 1000);
