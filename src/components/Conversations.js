import React, { useState, useEffect, useContext } from 'react';
import AddNewButton from './AddNewButton';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import { supabase } from '../supabaseClient';

const Conversations = ({ session }) => {
  const { getProfile, username } = useContext(AuthContext);
  const [converstaions, setConversations] = useState([]);

  const getUserConversations = async () => {
    let { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('sender', username);

    if (error) {
      console.log(error);
    }

    if (data) {
      setConversations(data);
    }

    console.log(converstaions);
  };

  useEffect(() => {
    getProfile();
    getUserConversations();
    console.log(username);
  }, []);

  return (
    <section>
      <header className='h-10 mt-12'>
        <h2 className='font-ps2 text-yellow-700 float-left ml-4'>
          CONVERSATIONS
        </h2>
        <Link to='/conversations/new'>
          <AddNewButton />
        </Link>
      </header>
      <ul className='mt-1 flex flex-col float-left ml-4 tracking-wider'>
        {converstaions.map((convo) => (
          <li
            key={convo.id}
            className='w-full text-slate-300 hover:text-slate-50 hover:cursor-pointer mb-1'
          >
            {convo.recipient}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Conversations;
