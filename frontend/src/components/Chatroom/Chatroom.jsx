import React from "react";
import { useState, useEffect, useRef } from "react"; // refactor out afterwards
// import { generateRandomColor, getUserFromStorage } from "../../helpers/chatroomHelpers";
// import { state, messageInputEnterHandler, userInputEnterHandler } from "../../hooks/useApplicationData";
import useApplicationData from "../../hooks/useApplicationData";

const userKeyInStorage = 'lighthouse-laboratory-user';
const chatMessageType = {
  message: 'message',
  newUser: 'newUser'
};
const eventTypes = {
  fullChatHistory: 'fullChatHistory',
  newMessage: 'newMessage',
  newUser: 'newUser'
};
// const { state, messageInputEnterHandler, userInputEnterHandler } = useApplicationData();
// const { user, message, chatHistory, weConn } = state;
// console.log(state)

const generateRandomColor = () => {
  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
  //random color will be freshly served
}

// const messagesEndRef = useRef(null);
// const scrollToBottom = () => {
//   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// };9
// useEffect(scrollToBottom, [message]);

export default function Chatroom() {
  /** TODO: need to make sure the below function only called once */
  const getUserFromStorage = () => {
    window.localStorage.removeItem(userKeyInStorage, null);
    const user = window.localStorage.getItem(userKeyInStorage);
    if (user) {
      // console.log(`Existing user found in storage: ${user}`);
      return JSON.parse(user);
    } else {
      // console.log('No user found from storage.');
      return user;
    }
  }
  const initUser = getUserFromStorage();

  const [user, setUser] = useState(initUser);
  const [message, setMessage] = useState('');
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
          window.localStorage.setItem(userKeyInStorage, JSON.stringify(data.eventData.user));
          break;
        default:
          console.log(`Unknown message type: ${data.type}`);
      }
    });

    setWsConn(ws);

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (message.length > 0) {
      const msgData = {
        type: eventTypes.newMessage,
        message: {
          user,
          message
        }
      };
      wsConn.send(JSON.stringify(msgData));
    }
  }, [message, wsConn]);

  useEffect(() => {
    if (user) {
      const msgData = {
        type: eventTypes.newUser,
        user
      };
      wsConn.send(JSON.stringify(msgData));
    }
  }, [user]);

  const messageInputEnterHandler = (event) => {
    if (event.charCode === 13) {
      const msg = event.target.value;
      // console.log(`Sending message: ${msg}`);
      setMessage(msg);
      event.target.value = '';
    }
  };

  const userInputEnterHandler = (event) => {
    if (event.charCode === 13) {
      const userName = event.target.value;
      if (userName.length < 0) return;

      // console.log(`Creating user: ${userName}`);
      setUser({
        name: userName,
        color: generateRandomColor()
      });
      event.target.value = '';
    }
  };

  const renderChatHistory = () => {
    if (chatHistory.length === 0) {
      return <p>No one said anything yet ...</p>;
    } else {
      return chatHistory.map((chatMsg, i) => {
        if (chatMsg.type == chatMessageType.newUser) {
          return (<p key={i} >User <b style={{ color: chatMsg.user.color }}>{chatMsg.user.name}</b> joined!</p >)
        } else {
          return (<p key={i} ><b style={{ color: chatMsg.user.color }}>{chatMsg.user.name}</b>: {chatMsg.message}</p >)
        }
      });
    }
  };

  const renderInputBox = () => {
    if (user) {
      return (<input type='text'
        placeholder='Hit enter to send message.'
        onKeyPress={messageInputEnterHandler} />);
    } else {
      return (<input type='text'
        placeholder='Enter your name to chat.'
        onKeyPress={userInputEnterHandler} />);
    }
  }

  return (
    <div className="chatbox">
      <p className="chat-title">chatbox</p>
      <div id='chat-transcript'>
        {renderChatHistory()}
      </div>
      <div className="input-box">
        {renderInputBox()}
      </div>
    </div>
  )
}