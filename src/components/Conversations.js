import React from 'react';
import AddNewButton from './AddNewButton';
import { Link } from 'react-router-dom';

const Conversations = ({ session }) => {
  return (
    <section>
      <header className='h-10'>
        <h2 className='font-ps2 text-yellow-700 float-left ml-4'>
          CONVERSATIONS
        </h2>
        <Link to='/conversations/new'>
          <AddNewButton />
        </Link>
      </header>
      <ul className='mt-1 flex flex-col float-left ml-4 tracking-wider'>
        <li className='w-full text-slate-300 hover:text-slate-50 hover:cursor-pointer mb-1'>
          General
        </li>
        <li className='w-full'>General</li>
        <li className='w-full'>{session.user.email}</li>
        <li className='w-full'>General</li>
      </ul>
    </section>
  );
};

export default Conversations;
