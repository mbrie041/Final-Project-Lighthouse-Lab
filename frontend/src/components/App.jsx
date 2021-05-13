import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard.jsx";
import "./App.scss"
import { Table } from 'react-bootstrap';

function App() {

	return (
		<div striped bordered hover variant="dark" className="app">
			<Leaderboard />
		</div>
	);
}

export default App;
