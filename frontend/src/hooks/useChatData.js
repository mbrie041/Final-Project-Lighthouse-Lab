import React, { useState, useEffect, useRef } from "react";
import { getChatUserFromStorage, saveChatUserToStorage } from "../helpers/chatroomHelpers";

const eventTypes = {
  fullChatHistory: 'fullChatHistory',
  newMessage: 'newMessage',
  newUser: 'newUser'
};

export default function useChatData() {
  const initChatUser = getChatUserFromStorage();

  const [chatUser, setChatUser] = useState(initChatUser);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [wsConn, setWsConn] = useState(null);
  const messagesEndRef = useRef(null);

  // Establish websocket connection and listen to message to load/send/create user
  useEffect(() => {
    const ws = new WebSocket('wss://f2a5702702b0.ngrok.io/');

    ws.addEventListener('open', function (event) {
      console.log("Connected to Chat server");
    });

    ws.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case eventTypes.newMessage:
          setChatHistory(prevChatHistory => [...prevChatHistory, data.eventData.message]);
          break;
        case eventTypes.fullChatHistory:
          setChatHistory(data.eventData.chatHistory);
          break;
        case eventTypes.newUser:
          saveChatUserToStorage(data.eventData.user);
          break;
        default:
          console.log(`Unknown message type: ${data.type}`);
      }
    });

    setWsConn(ws);

    return () => socket.close();
  }, []);

  // Send chat message object to websocket
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

  // Send new user object to websocket
  useEffect(() => {
    if (chatUser) {
      const eventData = {
        type: eventTypes.newUser,
        user: chatUser
      };
      wsConn.send(JSON.stringify(eventData));
    }
  }, [chatUser]);

  // Autoscroll on chatbox to bottom
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory]);

  return {
    chatHistory,
    chatUser,
    messagesEndRef,
    setChatUser,
    setChatMessage
  }
}