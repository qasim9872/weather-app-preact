import { h, render, Component } from 'preact';
import { Router, Link } from 'preact-router';

import style from './style';
import Header from '../header';

import $ from 'jquery';

import Button from '../button';
// import dropDown from '../dropdownExample';

export default class detailedWeather extends Component {
	// constructor(props)
	// {
	// 	super(props);
		
	// 	this.state.temp1 = "";
		
	// 	this.state.cond = "";
	// 	// this.fetchWeatherData2();
	// }

	render({location}) {

	alert("hello");

	var containerStyle = style.container;



		return (
			<div class={containerStyle}>
				<Header />
				hello
						
				
			</div>
		);
	}

	
}
