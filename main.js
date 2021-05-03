let date = new Date().getDate();
var day,
  month,
  year = null;

let dayArray = new Array(7);
dayArray[0] = "Sunday";
dayArray[1] = "Monday";
dayArray[2] = "Tuesday";
dayArray[3] = "Wednesday";
dayArray[4] = "Thursday";
dayArray[5] = "Friday";
dayArray[6] = "Saturday";

let monthArray = new Array(12);
monthArray[0] = "January";
monthArray[1] = "February";
monthArray[2] = "March";
monthArray[3] = "April";
monthArray[4] = "May";
monthArray[5] = "June";
monthArray[6] = "July";
monthArray[7] = "August";
monthArray[8] = "September";
monthArray[9] = "October";
monthArray[10] = "November";
monthArray[11] = "December";

function displayDate() {
  now = new Date();
  if (date != now.getDate() || day == null) {
    day = dayArray[now.getDay()];
    month = monthArray[now.getMonth()];
    date = now.getDate();
    year = now.getFullYear();
  }
  ReactDOM.render(
    day +
      ", " +
      month +
      " " +
      date +
      ", " +
      year +
      " " +
      (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) +
      ":" +
      (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
      ":" +
      (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds())+
      " HKT",
    document.getElementById("clock")
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
