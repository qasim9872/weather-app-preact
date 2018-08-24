// import preact
import { h, render, Component } from 'preact';
import { Link } from 'preact-router';

import style from './style';
	
export default class Button extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) 
    {
		// if(!clickFunction)
        // {
		// 	clickFunction = () => {
		// 		console.log("passed something as 'clickFunction' that wasn't a function !");
		// 	}
		// }	
		return (
			<div>
				<button class={style.button} onClick={clickFunction} >
					 ⛅ view detailed
				</button>
			</div>
		);
	}
}

