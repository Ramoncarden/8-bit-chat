import React, { useContext } from 'react';
import ChatContext from '../Context/ChatContext';
import Banner from './Banner';
import MessageInput from './MessageInput';

const ChatRoom = () => {
  const { formData, setFormData } = useContext(ChatContext);
  const time = new Date().toLocaleString();
  return (
    <div className='flex flex-col bg-orange-100 h-full sm:w-full h-screen relative overflow-hidden'>
      <Banner />
      <div className='absolute bottom-20 left-3 leading-6'>
        <p className='inline-block text-gray-700 tracking-wide'>
          <span className='float-left inline-block italic font-ps2 text-emerald-700 text-xs pt-1 tracking-wide mr-3'>
            RegisteredChatUser
          </span>
          {formData.content}
          <span className='text-xs italic ml-2 text-gray-500'> ({time})</span>
        </p>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatRoom;
