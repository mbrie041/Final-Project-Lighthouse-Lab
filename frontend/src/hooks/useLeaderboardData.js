import React, { useState, useEffect } from "react";
import axios from "axios";

export default function userApplicationData() {

  const [stats, setStats] = useState([]);

  // Get scores to display on Leaderboard
  useEffect(() => {
    const getStats = axios.get('http://localhost:3001/api/stats');
    getStats
      .then(response => {
        setStats(response.data);
      });
  }, []);

  // Update scores to leaderboard upon gameover scene
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');
    socket.addEventListener('open', (event) => {
      console.log("connected to server");
    });

    socket.addEventListener('message', (event) => {
      const statsObj = JSON.parse(event.data);

      if (statsObj.type === "UPDATE_LEADERBOARD") {
        setStats(prev => ([...prev, statsObj]));
      }
    });
    return () => socket.close();
  }, [])

  return { stats }
}