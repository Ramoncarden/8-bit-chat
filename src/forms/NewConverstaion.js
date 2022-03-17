import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import swords from '../assets/swords.png';

const NewConverstaion = () => {
  // const u = {};
  const u = supabase.auth.user();
  // const { users } = {};
  const users = {};
  const [currentUsers, setCurrentUsers] = useState({});
  const navigate = useNavigate();

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

  useEffect(() => {
    gatherUsers();
    console.log(currentUsers);
  }, []);

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
                <ul className='space-y-2'>
                  {Object.values(currentUsers)
                    .filter((user) => user.id !== u?.id)
                    .map((user) => (
                      <Link
                        key={user.id}
                        className='block text-yellow-50 font-ps2 text-sm'
                        to={`/conversations/${user.id}`}
                      >
                        <li className='flex items-center'>
                          <img
                            className='w-8 h-8 rounded-full mr-4'
                            src={swords}
                            alt='user avatar'
                          />
                          {user.username}
                        </li>
                      </Link>
                    ))}
                  {/* {currentUsers.map((u) => (
                    <li key={u.id}>{u.username}</li>
                  ))} */}
                </ul>
              </div>
              <div className='mt-6 space-x-2'>
                <button
                  type='button'
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-emerald-100 border border-transparent rounded-md hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500'
                  onClick={close}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewConverstaion;
