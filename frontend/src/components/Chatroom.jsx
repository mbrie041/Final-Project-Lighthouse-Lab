import React from "react";
import { useState, useEffect } from "react"; // refactor out afterwards

export default function Chatroom() {

  const [transcript, setTranscript] = useState([]);
  const [wsConn, setWsConn] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3002');
    socket.addEventListener('open', function (event) {
      console.log("connected to Chat server");
    });

    socket.addEventListener('message', function (event) {

      const statsObj = JSON.parse(event.data);
      console.log("message from server ", statsObj);

      if (statsObj.type === "UPDATE_LEADERBOARD") {
        setStats(prev => [...prev, statsObj]);
      }

    });

    setWsConn(socket);

    return () => socket.close();
  }, [])

  const inputEnterHandler = (event) => {
    if (event.charCode === 13) {
      console.log('send message', event.target.value);
    }
  };

  return (
    <div className="chatroom">
      <h2>chatbox</h2>
      <div id='chat-transcript'>

      </div>
      <input type='text'
        placeholder='Hit enter to send message.'
        onKeyPress={inputEnterHandler} />
    </div>
  )
}