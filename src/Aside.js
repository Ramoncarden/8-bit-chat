import React from 'react';
import DiscordButton from './components/DiscordButton';
import ChatButton from './components/ChatButton';
import Rooms from './components/Rooms';
import Conversations from './components/Conversations';
import UserInfo from './components/UserInfo';
import LogoutButton from './components/LogoutButton';

const Aside = ({ session }) => {
  return (
    <aside className='w-full h-full sm:w-80 px-2 bg-green-900 relative'>
      <div className='top-0 p-4 w-full flex flex-col items-center overflow-hidden'>
        {session ? <LogoutButton /> : <DiscordButton />}

        {/* <ul className='flex flex-col overflow-hidden'></ul> */}
      </div>
      <ChatButton />
      <Rooms />
      {session && <Conversations session={session} />}
      {session && <UserInfo session={session} />}
    </aside>
  );
};

export default Aside;
