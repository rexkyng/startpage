import * as React from "react";

const weekDayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthArray = [
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
var timezone = false;

export default class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			time: new Date(),
		};
	}

	componentDidMount() {
		setInterval(this.update, 1000);
	}

	update = () => {
		this.setState({
			time: new Date(),
		});
	};

	render() {
		const time = this.state.time;
		const weekDay = weekDayArray[time.getDay()];
		const month = monthArray[time.getMonth()];
		const date = time.getDate();
		const hour = time.getHours();
		const minute = time.getMinutes();
		const second = time.getSeconds();
		if (timezone) timezone; 
		else {
			timezone = time
				.toString()
				.match(/\(([^\)]+)\)$/)[1]
				.match(/\b(\w)/g)
				.join("");
			if (timezone == "HKST" || timezone == "CST") timezone = "HKT";
		}
		const year = time.getFullYear();
		return (
			<div className="newline">
				<a id="clock-url" href={this.props.href}>
					{weekDay} {month} {date} {hour}:
					{minute < 10 ? "0" + minute : minute}:
					{second < 10 ? "0" + second : second} {timezone} {year}
				</a>
			</div>
		);
	}
}
