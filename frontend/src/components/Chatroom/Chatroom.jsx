import React from "react";
import useChatData from '../../hooks/useChatData';
import ChatHistory from './ChatHistory.jsx';
import ChatInput from "./ChatInput.jsx";

// const messagesEndRef = useRef(null);
// const scrollToBottom = () => {
//   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// };9
// useEffect(scrollToBottom, [message]);

export default function Chatroom() {

  const { chatHistory, chatUser, setChatUser, setChatMessage } = useChatData();

  return (
    <div className="chatbox">
      <p className="chat-title">CHATROOM</p>
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput chatUser={chatUser}
        setChatUser={setChatUser}
        setChatMessage={setChatMessage} />
    </div>
  )
}