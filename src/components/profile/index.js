import { h, render, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';
import b_style from '../button/style';
import backStyle from '../Allweather'

import $ from 'jquery';

import Header from '../header';

export default class Profile extends Component {
	state = {
		firstRun : true,
		step : 0,
		conditions : "",
		// list : []
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ location }) {
		
		{this.state.firstRun ? this.setup(location) : ""}

		var containerStyle;

		if(this.state.conditions.includes("Clear"))
		{
			containerStyle = `${style.container} ${style.clear}`;
		}
		else if (this.state.conditions.includes("Few Clouds"))
		{
			containerStyle = `${style.container} ${style.partlyCloudy}`;
		}  
		else if (this.state.conditions.includes("Clouds"))
		{
			containerStyle = `${style.container} ${style.cloudy}`;
		}
		else if (this.state.conditions.includes("Rain"))
		{
			containerStyle = `${style.container} ${style.rainy}`;
		}
		else if (this.state.conditions.includes("Sunny"))
		{
			containerStyle = `${style.container} ${style.sunny}`;
		}
		else if (this.state.conditions.includes("Mist") || this.state.conditions.includes("Fog"))
		{
			containerStyle = `${style.container} ${style.mist}`;
		}
		else if (this.state.conditions.includes("Smoke"))
		{
			containerStyle = `${style.container} ${style.smoke}`;
		}
		else{
			containerStyle = `${style.container} ${style.default}`;
		}

		var linkURL = "/loc/" + this.state.city;
		var locURL = "/loc/" + location;
		
		return (
			<div class={containerStyle}>
				<Header locationURL={locURL}/>
				<div class={style.content}>
					
				{this.state.temp ?  "" : "CLICK NEXT TO SHOW"}

					<span class={style.spanCity} >{ this.state.city }</span>
					<span class={style.normal} >{ this.state.conditions }</span>
					<span class={style.temp} >{ this.state.temp ?  this.state.temp + "°" : ""}</span>
					

					<button class={b_style.buttonLeft} onClick={() => 
						{
							if (this.state.step>0)
								 this.state.step -= 1;
							this.stepLoad();
						}
						} >
					previous 
					</button>

					<button class={b_style.button} onClick={() => 
						{
							if (this.state.step<this.state.count)
								 this.state.step += 1;
							this.stepLoad();
						}
						} >
					next
					</button>

					
					{this.state.date=="invalid date" ? "click next" : this.state.date}

					<div class={ backStyle.conditions }>
							min temp: { this.state.tempMin ?  this.state.tempMin + "°" : ""}
							</div>
						<div class={ backStyle.conditions }>
							max temp: { this.state.tempMax ?  this.state.tempMax + "°" : ""}
							</div>
					<div class={ backStyle.conditions }>
							wind speed: { this.state.wind ?  this.state.wind + " mph" : ""}
							</div>

					<Link class={style.a} href={linkURL} > ⛅ view locations</Link>
					
				</div>
			</div>
		);
	}

	stepLoad = () =>
	{
		
		try {
			// console.log(this.state.list1);

			var date = this.state.list1[this.state.step]['dt_txt'];
			var dateFormatted = ((new Date(date).toString()).substring(0, 25));
			var temp = this.state.list1[this.state.step]['main']['temp'];
			var tempMax = this.state.list1[this.state.step]['main']['temp_max'];
			var tempMin = this.state.list1[this.state.step]['main']['temp_min'];
			var conditions = this.state.list1[this.state.step]['weather'][0]['main'];
			var wind = this.state.list1[this.state.step]['wind']['speed'];

			this.setState(
				{
					date : dateFormatted,
					temp : temp,
					tempMax : tempMax,
					tempMin : tempMin,
					conditions : conditions,
					wind : wind
				}
			);

		} catch (error) {
			console.log("data from api not loaded");
		}
	

	}

	setup = (location) =>
	{
		this.setState({city: location,
		 				firstRun : false});
        						 
		this.fetchWeatherData();
		this.stepLoad();
	}

	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json

		var url = "http://api.openweathermap.org/data/2.5/forecast?q="+this.state.city+"&units=metric&appid=a9c1f8f091089d3a4e066388bbef1ead";
		
		$.ajax({
			url: url,
			dataType: "jsonp",
			// timeout: 1000000,
			success : this.parseResponse,
			error : () => {this.setState({
				displayError : true
			});}
		})
	}

	parseResponse = (parsed_json) => {

		try {

		var location = parsed_json['city']['name'];
		var cnt = parsed_json['cnt'];
		var biglist = parsed_json['list'];//[0]['dt_txt'];//['dt_txt'];
		
		this.setState({
				displayError : false,
				city: location,	
				count : cnt,
				list1 : biglist
			});
			
		} catch (error) {
			console.log(error);
			this.setState({
				displayError : true
			});
		}
	}
}
