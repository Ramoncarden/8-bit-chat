import React from 'react';

const Rooms = () => {
  return (
    <section>
      <header className='h-10'>
        <h2 className='font-ps2 text-yellow-700 float-left ml-4'>ROOMS</h2>
      </header>
      <ul className='mt-1 flex flex-col float-left ml-4 tracking-wider'>
        <li className='w-full text-slate-300 hover:text-slate-50 hover:cursor-pointer mb-1'>
          General
        </li>
        <li className='w-full'>General</li>
        <li className='w-full'>General</li>
        <li className='w-full'>General</li>
      </ul>
    </section>
  );
};

export default Rooms;
