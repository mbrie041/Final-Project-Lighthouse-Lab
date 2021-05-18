import React from "react";

const chatMessageType = {
  message: 'message',
  newUser: 'newUser'
};

export default function ChatHistory({ chatHistory }) {
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
  }

  return (
    <div id='chat-transcript'>
      {renderChatHistory()}
    </div>
  )
}