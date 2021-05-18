import React from "react";

const generateRandomColor = () => {
  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
  //random color will be freshly served
}

export default function ChatInput({ chatUser, setChatUser, setChatMessage }) {

  const messageInputEnterHandler = (event) => {
    if (event.charCode === 13) {
      const msg = event.target.value;
      console.log(`Sending message: ${msg}`);
      setChatMessage(msg);
      event.target.value = '';
    }
  };

  const userInputEnterHandler = (event) => {
    if (event.charCode === 13) {
      const userName = event.target.value;
      if (userName.length < 0) return;

      console.log(`Creating user: ${userName}`);
      setChatUser({
        name: userName,
        color: generateRandomColor()
      });
      event.target.value = '';
    }
  };

  if (chatUser) {
    return (
      <div className="input-box">
        <input type='text'
          placeholder='Hit enter to send message.'
          onKeyPress={messageInputEnterHandler} />
      </div>
    );
  } else {
    return (
      <div className="input-box">
        <input type='text'
          placeholder='Enter your name to chat.'
          onKeyPress={userInputEnterHandler} />
      </div>
    );
  }
}