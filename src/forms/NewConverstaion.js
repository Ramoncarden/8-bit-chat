import React, { useState, useEffect, Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import swords from '../assets/swords.png';
import { data } from 'autoprefixer';

const NewConverstaion = ({ session }) => {
  const u = supabase.auth.user();
  const [loading, setLoading] = useState(true);
  const [currentUsers, setCurrentUsers] = useState([]);
  const navigate = useNavigate();
  const [messageRecipient, setMessageRecipient] = useState({
    sender: '',
    recipient: '',
  });

  const close = () => navigate(-1);

  const gatherUsers = async () => {
    let { data, error } = await supabase.from('profiles').select('*');

    if (error) {
      console.log(error);
    }

    if (data) {
      setCurrentUsers(data);
    }
  };

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
        setMessageRecipient({ ...messageRecipient, sender: data.username });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(messageRecipient);

      const { data, error } = await supabase
        .from('conversations')
        .insert([messageRecipient], { returning: 'minimal' });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      close();
    }
  };

  const handleChange = (e) => {
    setMessageRecipient({
      ...messageRecipient,
      recipient: e.target.innerText,
    });
  };

  // useEffect(() => {;
  // }, [session]);

  useEffect(() => {
    gatherUsers();
  }, [session]);

  useEffect(() => {
    getProfile();
  }, [session]);

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto bg-slate-800'
        onClose={close}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-emerald-900 shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium font-ps2 leading-6 text-yellow-500'
              >
                Message User
              </Dialog.Title>
              <div className='mt-4 h-96 overflow-y-auto'>
                <form onSubmit={handleSubmit}>
                  <ul className='space-y-2'>
                    {currentUsers
                      .filter((user) => user.id !== u?.id)
                      .map((user) => (
                        <button
                          type='button'
                          id={user.id}
                          key={user.id}
                          value={messageRecipient.recipient}
                          onClick={handleChange}
                          className='block w-full hover:bg-green-600 focus:bg-green-600 text-yellow-50 font-ps2 text-sm'
                        >
                          <li className='flex items-center'>
                            <img
                              className='w-8 h-8 rounded-full mr-4'
                              src={swords}
                              alt='user avatar'
                            />
                            {user.username}
                          </li>
                        </button>
                      ))}
                  </ul>
                  <div className='mt-6 space-x-2'>
                    <button
                      type='button'
                      className='inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-emerald-100 border border-transparent rounded-md hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500'
                      onClick={close}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-emerald-100 border border-transparent rounded-md hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewConverstaion;
