import React, { useContext, useEffect, useState } from 'react';
import ChatContext from '../Context/ChatContext';
import Banner from './Banner';
import MessageInput from './MessageInput';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ChatRoom = ({ session }) => {
  const { formData, setFormData } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { roomId } = useParams();

  //
  const getAllMessages = async () => {
    try {
      console.log('afdaf');
      setLoading(true);
      let { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', roomId);
      if (data) {
        setMessages(data);
        console.log(messages);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    const chat = document.getElementById('chatList');
    chat.scrollTop = chat.scrollHeight;
  };

  /* Subscribe to messagelistener to get realtime messages when
  roomId changes. unsubscribe at the end fixes memory leak
  and infinite re-renders. */
  useEffect(() => {
    getAllMessages();
    scrollToBottom();
    const messageSubscription = supabase
      .from('messages')
      .on('*', (message) => {
        setMessages((curMessages) => [...curMessages, message]);
        getAllMessages();
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(messageSubscription);
    };
  }, [roomId]);

  // ! PARENTHESIS TO RETURN ITEMS!!!

  return (
    <div className='flex flex-col bg-orange-100 h-full sm:w-full h-screen relative'>
      <Banner />
      <div
        id='chatList'
        className='leading-6 overflow-y-auto h-[84%] mx-2 flex flex-col mt-8 place-content-end'
      >
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
