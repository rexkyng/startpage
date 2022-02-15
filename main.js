// variables
var config;
var timezone;
let date = new Date().getDate();
var day,
	month,
	year = null;
let dayArray = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let monthArray = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

// init
function loadConfig() {
	try {
		loadCookie();
	} catch (loadErr) {
		console.log("Pervious config not cached (correctly)");
		loadJSON();
	} finally {
		try {
			clockConfig();
			groupingConfig();
			searchConfig();
		} catch (rendErr) {
			document.getElementById("ls").outerHTML =
				"<div class='newline'>ls: cannot open directory '.': Permission denied</div>";
		}
	}
}

// try: load config from cookie
function loadCookie() {
	var cookieValue = document.cookie
		.split(";")
		.find((row) => row.startsWith("cachedConfig="))
		.split("=")[1];
	console.log("Cached config found");
	console.log(
		"To generate a new config cache, delete cookie named `cachedConfig`"
	);
	config = JSON.parse(cookieValue);
}

// fallback: load config from json
function loadJSON() {
	console.log("Loading json config...");
	var customConfig = new XMLHttpRequest();
	customConfig.overrideMimeType("application/json");
	customConfig.open("GET", "config.json", true);
	// xmlhttp.open("GET", "https://timescam.gitlab.io/startpage/config.json", true);	// or you can host the xml only
	customConfig.onreadystatechange = function () {
		if (customConfig.readyState === 4 && customConfig.status === 200) {
			var jsonObj = this.responseText;
			config = JSON.parse(jsonObj);
			document.cookie =
				"cachedConfig=" + jsonObj.replace(/[\t\n\r]/gm, "");
			+"; SameSite=None; Secure";
			console.log("json config cached");
		}
	};
	customConfig.send(null);
}

// clock
function clockConfig() {
	timezone = config.clock.timezone;
	document.getElementById("clock-url").href = config.clock.url;
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
			(now.getMinutes() < 10
				? "0" + now.getMinutes()
				: now.getMinutes()) +
			":" +
			(now.getSeconds() < 10
				? "0" + now.getSeconds()
				: now.getSeconds()) +
			" " +
			timezone,
		document.getElementById("clock")
	);
}

// shortcuts
function groupingConfig() {
	var table = "<table>";
	Object.keys(config.shortcuts).forEach(function (folder) {
		var content = "";
		config.shortcuts[folder].forEach(
			(element) =>
				(content +=
					'<td><a href="' +
					element.url +
					'">' +
					element.title +
					"</a></td>")
		);
		table += '<tr><th id="folder">' + folder + "</th>" + content + "</tr>";
	});
	table += "</table>";
	document.getElementById("ls").innerHTML = table;
}

// Search engine
function searchConfig() {
	document.getElementById("search-bar").action = config.search;
}

// jobs
loadConfig();
displayDate();
setInterval(displayDate, 1000);

// idk
console.log(`
████████╗██╗███╗░░░███╗███████╗░██████╗░█████╗░░█████╗░███╗░░░███╗░░░░
╚══██╔══╝██║████╗░████║██╔════╝██╔════╝██╔══██╗██╔══██╗████╗░████║░░░░
░░░██║░░░██║██╔████╔██║█████╗░░╚█████╗░██║░░╚═╝███████║██╔████╔██║░░░░
░░░██║░░░██║██║╚██╔╝██║██╔══╝░░░╚═══██╗██║░░██╗██╔══██║██║╚██╔╝██║▀ █▀
░░░██║░░░██║██║░╚═╝░██║███████╗██████╔╝╚█████╔╝██║░░██║██║░╚═╝░██║░ ▄█
░░░╚═╝░░░╚═╝╚═╝░░░░░╚═╝╚══════╝╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝░░░░

█▀ ▀█▀ ▄▀█ █▀█ ▀█▀ █▀█ ▄▀█ █▀▀ █▀▀
▄█ ░█░ █▀█ █▀▄ ░█░ █▀▀ █▀█ █▄█ ██▄
`);
