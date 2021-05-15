import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard.jsx";
import Chatroom from "./Chatroom.jsx";
import "./App.scss"


function App() {

	return (
		<div className="app">
			<Leaderboard />
			<Chatroom />
		</div>
	);
}

export default App;
