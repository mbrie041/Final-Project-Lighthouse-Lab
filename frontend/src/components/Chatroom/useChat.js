import React, { useState, useEffect } from "react";

/** TODO: consider to abstract the below functions to separate file */
const chatUserKeyInStorage = 'lighthouse-laboratory-user';
const getChatUserFromStorage = () => {

  window.localStorage.removeItem(chatUserKeyInStorage, null);
  const user = window.localStorage.getItem(chatUserKeyInStorage);
  if (user) {
    console.log(`Existing user found in storage: ${user}`);
    return JSON.parse(user);
  } else {
    console.log('No user found from storage.');
    return user;
  }
}

const saveChatUserToStorage = (user) => {
  window.localStorage.setItem(chatUserKeyInStorage, JSON.stringify(user));
};
/** ---- */


const eventTypes = {
  fullChatHistory: 'fullChatHistory',
  newMessage: 'newMessage',
  newUser: 'newUser'
};

export default function useChat() {
  const initChatUser = getChatUserFromStorage();

  /** Chat user */
  const [chatUser, setChatUser] = useState(initChatUser);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [wsConn, setWsConn] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3002');

    ws.addEventListener('open', function (event) {
      console.log("Connected to Chat server");
    });

    ws.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      // console.log('data ', data);
      switch (data.type) {
        case eventTypes.newMessage:
          // console.log(`Received new message: ${JSON.stringify(data.eventData.message)}`);
          setChatHistory(prevChatHistory => [...prevChatHistory, data.eventData.message]);
          break;
        case eventTypes.fullChatHistory:
          // console.log(`Received full chat history: ${data.eventData.chatHistory}`);
          setChatHistory(data.eventData.chatHistory);
          break;
        case eventTypes.newUser:
          // console.log(`TODO: New user created, saving to storage: ${JSON.stringify(data.eventData.user)}`);
          saveChatUserToStorage(data.eventData.user);
          break;
        default:
          console.log(`Unknown message type: ${data.type}`);
      }
    });

    setWsConn(ws);

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (chatMessage.length > 0) {
      const eventData = {
        type: eventTypes.newMessage,
        message: {
          user: chatUser,
          message: chatMessage
        }
      };
      wsConn.send(JSON.stringify(eventData));
    }
  }, [chatMessage, wsConn]);

  useEffect(() => {
    if (chatUser) {
      const eventData = {
        type: eventTypes.newUser,
        user: chatUser
      };
      wsConn.send(JSON.stringify(eventData));
    }
  }, [chatUser]);

  return {
    chatHistory,
    chatUser,
    setChatUser,
    setChatMessage
  }
}