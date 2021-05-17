import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard/Leaderboard.jsx";
import Chatroom from "./Chatroom/Chatroom.jsx";
import { Table } from 'react-bootstrap';
import "./App.scss"


function App() {

	return (

		<div className="app">
			<Leaderboard className="table" />
			<Chatroom />
		</div>
	);
}

export default App;
