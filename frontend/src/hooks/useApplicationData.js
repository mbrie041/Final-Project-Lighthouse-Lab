import React, { useState, useEffect } from "react";
import axios from "axios";
// import { getUserFromStorage } from '../helpers/chatroomHelpers';

export default function userApplicationData() {

  /** TODO: need to make sure the below function only called once */
  const userKeyInStorage = 'lighthouse-laboratory-user';
  // const getUserFromStorage = () => {

  //   window.localStorage.removeItem(userKeyInStorage, null);
  //   const user = window.localStorage.getItem(userKeyInStorage);
  //   if (user) {
  //     console.log(`Existing user found in storage: ${user}`);
  //     return JSON.parse(user);
  //   } else {
  //     console.log('No user found from storage.');
  //     return user;
  //   }
  // }

  // const initUser = getUserFromStorage();

  const [state, setState] = useState({
    stats: [],
    // user: initUser,
    // inputMessage: '',
    // chatHistory: [],
    // wsConn: null
  })

  // const userKeyInStorage = 'lighthouse-laboratory-user';

  // const chatMessageType = {
  //   message: 'message',
  //   newUser: 'newUser'
  // };

  // const eventTypes = {
  //   fullChatHistory: 'fullChatHistory',
  //   newMessage: 'newMessage',
  //   newUser: 'newUser'
  // };

  // const generateRandomColor = () => {
  //   var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  //   return randomColor;
  //   //random color will be freshly served
  // }

  // Get scores to display on Leaderboard
  useEffect(() => {
    const getStats = axios.get('http://localhost:3001/api/stats');
    getStats
      .then(response => {
        setState(prev => ({
          ...prev,
          stats: response.data
        }))
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
      console.log("message from server ", statsObj);

      if (statsObj.type === "UPDATE_LEADERBOARD") {
        setState(prev => ({ stats: [...prev.stats, statsObj] }));
      }
    });
    return () => socket.close();
  }, [])

  // Chatroom websocket listener for new messages and new user connections
  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:3002');

  //   ws.addEventListener('open', function (event) {
  //     console.log("Connected to Chat server");
  //   });

  //   ws.addEventListener('message', function (event) {
  //     const data = JSON.parse(event.data);
  //     console.log('data ', data);
  //     switch (data.type) {
  //       case eventTypes.newMessage:
  //         console.log(`Received new message: ${JSON.stringify(data.eventData.message)}`);
  //         setState(prev => ({ chatHistory: [...prev.chatHistory, data.eventData.message] }));
  //         break;
  //       case eventTypes.fullChatHistory:
  //         console.log(`Received full chat history: ${data.eventData.chatHistory}`);
  //         setState({ chatHistory: data.eventData.chatHistory });
  //         break;
  //       case eventTypes.newUser:
  //         console.log(`TODO: New user created, saving to storage: ${JSON.stringify(data.eventData.user)}`);
  //         window.localStorage.setItem(userKeyInStorage, JSON.stringify(data.eventData.user));
  //         break;
  //       default:
  //         console.log(`Unknown message type: ${data.type}`);
  //     }
  //   });

  //   setState({ wsConn: ws });

  //   return () => socket.close();
  // }, []);

  // useEffect(() => {
  //   if (state.inputMessage.length > 0) {
  //     const msgData = {
  //       type: eventTypes.newMessage,
  //       message: {
  //         user,
  //         message
  //       }
  //     };
  //     wsConn.send(JSON.stringify(msgData));
  //   }
  // }, [state.inputMessage, wsConn]);

  // useEffect(() => {
  //   if (state.user) {
  //     const msgData = {
  //       type: eventTypes.newUser,
  //       user
  //     };
  //     state.wsConn.send(JSON.stringify(msgData));
  //   }
  // }, [state.user]);


  // const messageInputEnterHandler = (event) => {
  //   if (event.charCode === 13) {
  //     const msg = event.target.value;
  //     console.log(`Sending message: ${msg}`);
  //     setState({ InputMessage: msg });
  //     event.target.value = '';
  //   }
  // };

  // const userInputEnterHandler = (event) => {
  //   if (event.charCode === 13) {
  //     const userName = event.target.value;
  //     if (userName.length < 0) return;

  //     console.log(`Creating user: ${userName}`);
  //     setState({
  //       user: {
  //         name: userName,
  //         color: generateRandomColor()
  //       }
  //     });
  //     event.target.value = '';
  //   }
  // };
  // return { state, messageInputEnterHandler, userInputEnterHandler }
  return { state }
}