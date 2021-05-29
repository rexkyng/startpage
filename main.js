// variables
var config;
var timezone = "HKT"
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

// xml config
function loadXMLDoc() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			config = this.responseXML;
			clockConfig();
			grouping();
			searchEngine();
		}
	};
	xmlhttp.open("GET", "config.xml", true);
	xmlhttp.send();
}

// clock
function clockConfig(){
	timezone = config.getElementsByTagName("timezone")[0].childNodes[0].nodeValue;
	document.getElementById("clock-url").href = config.getElementsByTagName("clock")[0].getElementsByTagName("url")[0].childNodes[0].nodeValue;

}
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
			(now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()) +
			" " +
			timezone,
		document.getElementById("clock")
	);

}

// favicon
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

// shortcuts
function grouping() {
	var x = config.getElementsByTagName("shortcuts")[0].childNodes;
	var tags = [];
	for (var i = 0; i < x.length; i++) {
		if (x[i].nodeType != 3 && !tags.includes(x[i].nodeName)) {
			display(x[i].nodeName);
			tags.push(x[i].nodeName);
		}
	}
}
function display(Tag) {
	var x = config.getElementsByTagName(Tag);
	var content = "";
	for (var i = 0; i < x.length; i++) {
		content +=
			'<td><a href="' +
			x[i].getElementsByTagName("url")[0].childNodes[0].nodeValue +
			'">' +
			x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
			"</a><td>";
	}
	document.getElementById("ls").innerHTML +=
		'<tr><th id="h">' + Tag + "</th>" + content + "</tr>";
}

// Search engine
function searchEngine(){
	document.getElementById("search-bar").action = config.getElementsByTagName("search")[0].childNodes[0].nodeValue;
}

loadXMLDoc();
displayDate();
setInterval(displayDate, 1000);
