import React, { useContext, useState, createContext } from "react";

const MessageContext = createContext();
const MessageSendContext = createContext();

export function useMessage() {
  return useContext(MessageContext);
}

export function useMessageSend() {
  return useContext(MessageSendContext);
}

export function MessageProvider({ children }) {
  const [chatMessage, setChatMessage] = useState({});

  function sendMessage(data) {
    setChatMessage(data);
    console.log(chatMessage);
  }

  return (
    <MessageContext.Provider value={chatMessage}>
      <MessageSendContext.Provider value={sendMessage}>
        {children}
      </MessageSendContext.Provider>
    </MessageContext.Provider>
  );
}
