import React from "react";
import { generateRandomColor } from "../../helpers/chatroomHelpers";

export default function ChatInput({ chatUser, setChatUser, setChatMessage }) {

  const messageInputEnterHandler = (event) => {
    if (event.charCode === 13) {
      const msg = event.target.value;

      setChatMessage(msg);
      event.target.value = '';
    }
  };

  const userInputEnterHandler = (event) => {
    if (event.charCode === 13) {
      const userName = event.target.value;
      if (userName.length < 0) return;

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