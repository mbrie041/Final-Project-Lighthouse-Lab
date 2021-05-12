import React from "react";
import Leaderboard from "./Leaderboard.jsx";
import "./App.scss"


export default class App extends React.Component {
	render() {
		return (
			<div striped bordered hover variant="dark" className="app">
				<Leaderboard />
			</div>
		);
	}
}
