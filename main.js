// variables
var config;
var timezone;
let date = new Date().getDate();
var day,
	month,
	year = null;
let dayArray = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
];
let monthArray = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

// init
function loadConfig() {
	if (localStorage.getItem("cachedConfig")) {
		loadLocalStorage();
	} else {
		console.log("Pervious config not cached (correctly)");
		loadJSON();
	}
}

function pageRender() {
	try {
		clockConfig();
		groupingConfig();
		searchConfig();
	} catch (rendErr) {
		document.getElementById("ls").outerHTML =
			"<div id='ls' class='newline'>ls: cannot open directory '.': Permission denied</div>";
	}
}

// try: load config from localStorage
function loadLocalStorage() {
	var cachedConfig = localStorage.getItem("cachedConfig");
	console.log("Cached config found");
	console.log(
		"To generate a new config cache, delete localStorage named `cachedConfig`"
	);
	config = JSON.parse(cachedConfig);
	console.log(cachedConfig);
	pageRender();
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
			localStorage.setItem(
				"cachedConfig",
				jsonObj.replace(/[\t\n\r]/gm, "")
			);
			console.log("json config cached");
			pageRender();
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
			" " +
			month +
			" " +
			date +
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
			timezone +
			" " +
			year,
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

// sleep
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// jobs
document.addEventListener("DOMContentLoaded", function (event) {
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
	░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	░░█▀ ▀█▀ ▄▀█ █▀█ ▀█▀ █▀█ ▄▀█ █▀▀ █▀▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	░░▄█ ░█░ █▀█ █▀▄ ░█░ █▀▀ █▀█ █▄█ ██▄░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	`);
});
