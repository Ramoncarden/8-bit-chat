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
      setLoading(true);
      console.log(roomId);
      let { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', roomId);
      if (data) {
        setMessages(data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* Subscribe to messagelistener to get realtime messages when
  roomId changes. unsubscribe at the end fixes memory leak
  and infinite re-renders. */
  useEffect(() => {
    getAllMessages();
    const messageSubscription = supabase
      .from('messages')
      .on('INSERT', (message) => {
        console.log('Change received!', message);
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
      <div className='absolute bottom-20 left-3 leading-6 overflow-y-auto h-5/6 mr-2'>
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
