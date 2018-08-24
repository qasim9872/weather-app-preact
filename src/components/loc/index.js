import { h, Component } from 'preact';
import { Link } from 'preact-router';

import Header from '../header';

import style from './style';

export default class Loc extends Component {
    state = 
    {
        location : ""
    }



	render({location}) {

        // var locURL = "/loc/" + {location ? location : this.state.location};
		// var link = "";
        return (
			<div class={`${style.container} ${style.loc}`}>
                <Header locationURL = {locURL}/>
				
            

				 <iframe width="360" height="300" frameborder="0" style="border:0"
                                                    src={"https://www.google.com/maps/embed/v1/search?q=clubs%20in%20London&key=AIzaSyABr27dG3Baz7MEJ5ulFt9T7o9xdEx-PO0"} allowfullscreen></iframe>

			</div> 
		);
	}	
}
