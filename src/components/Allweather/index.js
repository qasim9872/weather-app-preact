import { h, render, Component } from 'preact';
import { Link } from 'preact-router';

import style from './style';
import Header from '../header';

import $ from 'jquery';

import Button from '../button';
// import dropDown from '../dropdownExample';

export default class AllWeather extends Component {
	constructor(props)
	{
		super(props);
		this.state.temp1 = "";
		this.state.location = "London";
		this.state.cond = "";
		this.fetchWeatherData2();
	}

	render() {

	const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
	
	var containerStyle;

		if(this.state.cond.includes("Clear"))
		{
			containerStyle = `${style.container} ${style.clear}`;
		}
		else if (this.state.cond.includes("Few Clouds"))
		{
			containerStyle = `${style.container} ${style.partlyCloudy}`;
		}  
		else if (this.state.cond.includes("Clouds"))
		{
			containerStyle = `${style.container} ${style.cloudy}`;
		}
		else if (this.state.cond.includes("Rain"))
		{
			containerStyle = `${style.container} ${style.rainy}`;
		}
		else if (this.state.cond.includes("Sunny"))
		{
			containerStyle = `${style.container} ${style.sunny}`;
		}
		else if (this.state.cond.includes("Mist") || this.state.cond.includes("Fog"))
		{
			containerStyle = `${style.container} ${style.mist}`;
		}
		else if (this.state.cond.includes("Smoke"))
		{
			containerStyle = `${style.container} ${style.smoke}`;
		}
		else{
			containerStyle = `${style.container} ${style.default}`;
		}

		var linkURL = "/"+this.state.location;
		var locURL = "/loc/" + this.state.location;

		return (
			<div class={containerStyle}>
				<Header locationURL={locURL}/>
				<div class={ style.header }>
						<div class={ style.city }>{ this.state.locate }</div>
						<div class={ style.conditions }>{ this.state.cond }</div>
						<span class={ tempStyles }>{ this.state.temp }</span>
						<div class={ style.conditions }>
							min : { this.state.minTemp }
							</div>
						<div class={ style.conditions }>
							max : { this.state.maxTemp }
							</div>


					<Link class={style.a} href={linkURL} > ⛅ view detailed</Link>

				<input class={style.textField} type="text" placeholder="Enter different City" 
					 onChange={e => {
						 				this.setState({location: e.target.value,
										 	temp1: ""  }) 
										this.fetchWeatherData2()}
							} value={this.state.temp1}/> 

					{this.state.displayError ? "invalid location" : ""}

				</div>
			</div>
		);
	}


	fetchWeatherData2 = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json

		var url = "http://api.openweathermap.org/data/2.5/weather?q="+this.state.location+"&units=metric&appid=a9c1f8f091089d3a4e066388bbef1ead";
		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse2,
			error : () => {this.setState({
				displayError : true
			});}
		})
		
		
		// once the data grabbed, don't hide the button
		//this.setState({ display: false });
	}

	parseResponse2 = (parsed_json) => {

		// console.log(parsed_json);
		try {

		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var min_temp = parsed_json['main']['temp_min'];
		var max_temp = parsed_json['main']['temp_max'];
		var conditions = parsed_json['weather'][0]['main'];
		

		this.setState({
				displayError : false,
				locate: location,
				temp: temp_c,
				maxTemp : max_temp+"°",
				minTemp : min_temp+"°",
				cond : conditions,
				
			});
			
		} catch (error) {
			this.setState({
				displayError : true
			});
		}   

		
	}
}
