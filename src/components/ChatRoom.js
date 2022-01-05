import React from 'react';
import Banner from './Banner';
import MessageInput from './MessageInput';

const ChatRoom = () => {
  return (
    <div className='bg-orange-100 h-full flex flex-col sm:w-full h-screen relative'>
      <Banner />
      <MessageInput />
    </div>
  );
};

export default ChatRoom;
