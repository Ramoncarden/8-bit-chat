import React from 'react';
import DiscordButton from './components/DiscordButton';
import ChatButton from './components/ChatButton';
import Rooms from './components/Rooms';
import Conversations from './components/Conversations';

/* Todo: 
Add Discord login button
Add Chat logo
Add rooms and add button
Add room names
Add the converstion and button */

const Aside = () => {
  return (
    <aside className='w-full sm:w-80 px-2 bg-green-900'>
      <div className='top-0 p-4 w-full flex flex-col items-center'>
        <DiscordButton />
        {/* <ul className='flex flex-col overflow-hidden'></ul> */}
      </div>
      <ChatButton />
      <Rooms />
      <Conversations />
    </aside>
  );
};

export default Aside;
