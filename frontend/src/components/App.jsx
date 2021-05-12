import React from "react";
import Leaderboard from "./Leaderboard.jsx";
import "./App.scss"
import {Table} from 'react-bootstrap';

export default class App extends React.Component {
	render() {
		return (
			<div striped bordered hover variant="dark" className="app">
				<Leaderboard />
			</div>
		);
	}
}
