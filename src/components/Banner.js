import React, { useState, useEffect } from 'react';
import alien from '../assets/alien-pixelated-shape-of-a-digital-game.png';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Banner = () => {
  const [roomData, setRoomData] = useState({});
  const { roomId } = useParams();
  const [loading, setLoading] = useState(false);

  const getRoomInfo = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from('channels')
        .select(`*`)
        .eq('id', roomId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setRoomData(data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoomInfo();
  }, [roomId]);

  return (
    <div className='bg-slate-800 py-[7px] lg:px-3 w-full relative'>
      <h2 className='text-yellow-400/80 font-ps2 tracking-wide text-left w-10/12'>
        {roomData.slug}
      </h2>
      <p className='text-yellow-600/90 text-left w-10/12'>{roomData.topic}</p>
      <div className='float-right w-2/12'>
        <img
          className='w-12 h-12 opacity-75 float-right absolute top-1 right-4'
          src={alien}
          alt='alien pic'
        />
      </div>
    </div>
  );
};

export default Banner;
