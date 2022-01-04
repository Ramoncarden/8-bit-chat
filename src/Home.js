import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Todo: Style welcome message
// include login instructions links

const emphasisWords = 'text-red-600 hover:text-red-400 hover:cursor-pointer';
const textColor = 'text-zinc-700 text-sm font-ps2 mb-3';

const Home = () => {
  return (
    <>
      <div className='bg-orange-100 h-full px-8 py-2 flex flex-col justify-center items-center sm:w-full h-screen bg-animation bg-contain brightness-50'></div>
      <section className='bg-orange-100 p-10 rounded-lg drop-shadow-2xl absolute absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/2'>
        <h1 className='text-4xl font-ps2 mb-2 font-bold'>
          <span className='text-green-500'>8</span>
          <span className='text-blue-500'> B</span>
          <span className='text-yellow-500'>i</span>
          <span className='text-red-600'>t</span>
          <span className='text-blue-500'> C</span>
          <span className='text-yellow-500'>h</span>
          <span className='text-red-600'>a</span>
          <span className='text-blue-500'>t</span>
          <span className='text-green-500'>!</span>
          <FontAwesomeIcon
            className='mb-1 ml-1 text-green-700'
            icon='gamepad'
          />
        </h1>
        <h2 className='text-2xl text-green-600 font-ps2 mb-2'>
          Welcome fellow gamer.
        </h2>
        <h3 className={textColor}>
          Head over to the <span className={emphasisWords}>General</span> room.
        </h3>
        <h3 className={textColor}>
          <span className={emphasisWords}>Create</span> your own room.
        </h3>
        <p className={textColor}>
          Or <span className={emphasisWords}>Chat</span> directly with other
          users
        </p>
        <p className='text-xs font-ps2 mb-1 text-zinc-500'>
          (Must login to create rooms and send messages)
        </p>
      </section>
    </>
  );
};

export default Home;
