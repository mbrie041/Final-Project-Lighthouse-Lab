import React from "react";
import useChat from './useChat';
import ChatHistory from './ChatHistory.jsx';
import ChatInput from "./ChatInput.jsx";

// const messagesEndRef = useRef(null);
// const scrollToBottom = () => {
//   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// };9
// useEffect(scrollToBottom, [message]);














export default function Chatroom() {

  const { chatHistory, chatUser, setChatUser, setChatMessage } = useChat();

  const dummyfunction = () => {
    return "long string";
  }

  return (
    <div className="chatbox">
      <p className="chat-title">chatbox</p>
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput chatUser={chatUser}
        setChatUser={setChatUser}
        setChatMessage={setChatMessage} />
    </div>
  )
}