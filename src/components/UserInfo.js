import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from '../supabaseClient';

const UserInfo = ({ session }) => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        return data.username;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='mb-2 w-full flex flex-row justify-end absolute bottom-0 left-1'>
      <header className='h-10 w-4/6'>
        <h2 className='text-xs text-yellow-700 float-left ml-3 pt-1'>
          {username}
        </h2>
      </header>
      <div className='w-2/6 flex justify-end items-start mr-3'>
        <Link to='/users/account'>
          <FontAwesomeIcon
            icon='cog'
            className='text-yellow-400 text-2xl float-right'
          />
        </Link>
      </div>
    </section>
  );
};

export default UserInfo;
