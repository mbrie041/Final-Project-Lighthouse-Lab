import React from "react";
import Leaderboard from "./Leaderboard.jsx";

export default class App extends React.Component {
	render() {
		return (
			<div className="app" style={{ textAlign: "center" }}>
				<h1>Hello World</h1>
				<Leaderboard />
			</div>
		);
	}
}
