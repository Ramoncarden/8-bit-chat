import React, { useContext, useEffect, useState } from 'react';
import ChatContext from '../Context/ChatContext';
import Banner from './Banner';
import MessageInput from './MessageInput';
import { supabase } from '../supabaseClient';

const ChatRoom = ({ session }) => {
  const { formData, setFormData } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  const getAllMessages = async () => {
    let { data, error } = await supabase.from('messages').select('*');

    if (error) {
      console.log(error);
    }

    if (data) {
      setMessages(data);
    }
  };

  const messageSubscription = supabase
    .from('messages')
    .on('*', (message) => {
      console.log('Change received!', message);
    })
    .subscribe();

  useEffect(() => {
    getAllMessages();
  }, [messageSubscription]);

  // ! PARENTHESIS TO RETURN ITEMS!!!

  return (
    <div className='flex flex-col bg-orange-100 h-full sm:w-full h-screen relative overflow-hidden'>
      <Banner />
      <div className='absolute bottom-20 left-3 leading-6'>
        {messages.map((message) => (
          <div
            key={message.id}
            className='inline-block text-gray-700 tracking-wide w-full mb-3'
          >
            <span className='text-xs italic ml-1 mr-3 mt-1 text-gray-500 float-left'>
              {new Date(message.created_at).toLocaleString()}
            </span>
            <span className='float-left inline-block italic font-ps2 text-emerald-700 text-xs pt-1 tracking-wide mr-3'>
              {message.username}
            </span>
            {message.content}
          </div>
        ))}
      </div>
      <MessageInput session={session} />
    </div>
  );
};

export default ChatRoom;
