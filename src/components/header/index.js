import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Header extends Component {
	render({locationURL}) {
		console.log(locationURL);
		return (
			<header class={style.header}>
				<h1>Street spirit</h1>
				<nav>
					<Link href="/">Home</Link>
					{/*<Link href="/profile">Weather</Link>*/}
					<Link href={locationURL}>Loc</Link>
				</nav>
			</header>
		);
	}
}
