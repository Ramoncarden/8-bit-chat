import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    content: "",
    img: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((item) => ({ ...item, [name]: value }));
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      console.log(formData);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <ChatContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
