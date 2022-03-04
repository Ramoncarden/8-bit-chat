import React, { useState, useEffect } from 'react';
import AddNewButton from './AddNewButton';
import { Link, Routes, Route } from 'react-router-dom';
import ChatRoom from './ChatRoom';
import { supabase } from '../supabaseClient';

const Rooms = () => {
  const [channel, setChannel] = useState([]);

  const gatherAllChatRooms = async () => {
    let { data, error } = await supabase.from('channels').select('*');

    if (error) {
      console.log(error);
    }

    if (data) {
      setChannel(data);
      console.log(data);
    }
  };

  useEffect(() => {
    gatherAllChatRooms();
  }, []);

  return (
    <section className='h-1/6 mb-3'>
      <header className='h-10'>
        <h2 className='font-ps2 text-yellow-700 float-left ml-4'>ROOMS</h2>
        <Link to='/rooms/new'>
          <AddNewButton />
        </Link>
      </header>
      <ul className='mt-1 flex flex-col float-left ml-4 tracking-wider'>
        {channel.map((room) => (
          <li
            key={room.id}
            className='w-full text-slate-300 hover:text-slate-50 mb-1 hover:cursor-pointer'
          >
            <Link to={`/rooms/${room.slug}`}>{room.slug}</Link>
          </li>
        ))}
      </ul>
      {/* <Routes>
        <Route path=':id' element={<ChatRoom />} />
      </Routes> */}
    </section>
  );
};

export default Rooms;
