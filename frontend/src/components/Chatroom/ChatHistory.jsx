import React, { useRef, useEffect } from "react";

const chatMessageType = {
  message: 'message',
  newUser: 'newUser'
};

export default function ChatHistory({ chatHistory, messagesEndRef }) {

  const renderChatHistory = () => {
    if (chatHistory.length === 0) {
      return <p>Start chatting!</p>;
    } else {
      return chatHistory.map((chatMsg, i) => {
        if (chatMsg.type === chatMessageType.newUser) {
          return (
            <p className="new-user" key={i} >User <b style={{ color: chatMsg.user.color }}>{chatMsg.user.name}</b> joined! 🎉</p>
          )
        } else {
          return (
            <p className="chat-messages" key={i} >
              <b style={{ color: chatMsg.user.color }}>{chatMsg.user.name}</b>: {chatMsg.message}
            </p>
          )
        }
      });
    }
  }

  return (
    <div id='chat-transcript'>
      {renderChatHistory()}
      <div ref={messagesEndRef} />
    </div>
  )
}