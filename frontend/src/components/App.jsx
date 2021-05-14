import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard.jsx";
import "./App.scss";
import {Table} from 'react-bootstrap';


function App() {

	return (

		<div className="app">
			<Leaderboard class="table" />
		</div>
	);
}

export default App;
