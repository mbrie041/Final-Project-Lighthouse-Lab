import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard.jsx";
import "./App.scss"
import { Table } from 'react-bootstrap';

function App() {
	const [newScore, setNewScore] = useState({});



	return (
		<div striped bordered hover variant="dark" className="app">
			<Leaderboard newScore={newScore} />
		</div>
	);
}

export default App;

// export default class App extends React.Component {


// 	useEffect() {
// 		const socket = new WebSocket('ws://localhost:3001');
// 		socket.addEventListener('open', function (event) {
// 			console.log("connected to server");

// 		});

// 		socket.addEventListener('message', function (event) {
// 			console.log("message from server ", event.data);
// 		})
// 	}
// 	render() {
// 		return (
// 			<div striped bordered hover variant="dark" className="app">
// 				<Leaderboard />
// 			</div>
// 		);
// 	}
// }
