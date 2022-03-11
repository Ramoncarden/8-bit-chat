import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import swords from '../assets/swords.png';
import { supabase } from '../supabaseClient';

const NewRoom = () => {
  const location = useNavigate();

  const close = () => location(-1);

  const [formData, setFormData] = useState({
    slug: '',
    topic: '',
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data, error } = await supabase
        .from('channels')
        .insert([{ slug: formData.slug, topic: formData.topic }]);
    } catch (error) {
      console.log(error.message);
    } finally {
      close();
    }
  };
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
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-emerald-900 shadow-xl rounded-2xl relative'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 font-ps2 text-yellow-500'
              >
                Create Room
              </Dialog.Title>
              <img
                className='w-10 h-10 absolute top-4 right-5'
                src={swords}
                alt='two crossed swords'
              />
              <form onSubmit={handleSubmit}>
                <div className='mt-4'>
                  <p className='mb-1 text-sm text-gray-400'>
                    What would you like to name your room?
                  </p>
                  <input
                    name='name'
                    id='name'
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className='text-slate-700 bg-green-500 rounded-md py-2 px-4 w-full'
                  />
                </div>
                <div className='mt-4'>
                  <p className='mb-1 text-sm text-gray-400'>Room Topic</p>
                  <input
                    name='topic'
                    id='topic'
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        topic: e.target.value,
                      })
                    }
                    className='text-slate-700 bg-green-500 rounded-md py-2 px-4 w-full'
                  />
                </div>

                <div className='mt-6 space-x-2'>
                  <button
                    type='submit'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-emerald-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500'
                  >
                    Create
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-amber-600 bg-yellow-300 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500'
                    onClick={close}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewRoom;
