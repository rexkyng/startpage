var date = new Date().getDate();
var day,
month,
year = null;

function displayDate() {
  now = new Date();
  if (date != now.getDate() || day == null) {
    refreshDate();
  }

  document.getElementById("clock").innerHTML =
    day +
    ", " +
    month +
    " " +
    date +
    ", " +
    year +
    " " +
    displayClock() +
    " HKT";
}

function refreshDate() {
  switch (now.getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }
  switch (now.getMonth()) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
  }
  date = now.getDate();
  year = now.getFullYear();
}

function displayClock() {
  return (
    (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) +
    ":" +
    (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
    ":" +
    (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds())
  );
}

function change_favicon(img) {
  var favicon = document.querySelector('link[rel="shortcut icon"]');

  if (!favicon) {
    favicon = document.createElement("link");
    favicon.setAttribute("rel", "shortcut icon");
    var head = document.querySelector("head");
    head.appendChild(favicon);
  }

  favicon.setAttribute("type", "image/png");
  favicon.setAttribute("href", img);
}

displayDate();
setInterval(displayDate, 1000);
