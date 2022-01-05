import React from 'react';
import AddNewButton from './AddNewButton';
import { Link, Routes, Route } from 'react-router-dom';
import ChatRoom from './ChatRoom';

const Rooms = () => {
  return (
    <section className='h-1/6'>
      <header className='h-10'>
        <h2 className='font-ps2 text-yellow-700 float-left ml-4'>ROOMS</h2>
        <AddNewButton />
      </header>
      <ul className='mt-1 flex flex-col float-left ml-4 tracking-wider'>
        <li className='w-full text-slate-300 hover:text-slate-50 mb-1 hover:cursor-pointer'>
          <Link to='/rooms/general'>General</Link>
        </li>
        <li className='w-full'>General</li>
        <li className='w-full'>General</li>
        <li className='w-full'>General</li>
      </ul>
      {/* <Routes>
        <Route path=':id' element={<ChatRoom />} />
      </Routes> */}
    </section>
  );
};

export default Rooms;
