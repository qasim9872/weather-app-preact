import { h, Component } from 'preact';
import { Router } from 'preact-router';

import AllWeather from './Allweather';
import Loc from './loc';
import Profile from './profile';


import style from './home/style';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div >
				
				<Router onChange={this.handleRoute}>
					<AllWeather path="/" />
					<Profile path="/:location" />
					<Loc path="/loc/:location" />
				</Router>
			</div>
		);
	}
}
