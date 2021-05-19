import React from "react";
import useChatData from '../../hooks/useChatData';
import ChatHistory from './ChatHistory.jsx';
import ChatInput from "./ChatInput.jsx";

export default function Chatroom() {

  const { chatHistory, chatUser, messagesEndRef, setChatUser, setChatMessage } = useChatData();

  return (
    <div className="chatbox">
      <p className="chat-title">CHATROOM</p>
      <ChatHistory chatHistory={chatHistory}
        messagesEndRef={messagesEndRef} />
      <ChatInput chatUser={chatUser}
        setChatUser={setChatUser}
        setChatMessage={setChatMessage} />
    </div>
  )
}