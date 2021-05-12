import React from "react";
import Leaderboard from "./Leaderboard.jsx";
import "./App.scss"


export default class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Leaderboard />
			</div>
		);
	}
}
