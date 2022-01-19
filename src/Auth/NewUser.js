import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swords from '../assets/swords.png';
import Toast from '../components/Toast';
import { supabase } from '../supabaseClient';
import ChatContext from '../Context/ChatContext';

const NewUser = () => {
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState({
  //   email: '',
  //   username: '',
  //   password: '',
  //   passwordConfirm: '',
  // });
  const [email, setEmail] = useState('');
  const { handleChange } = useContext(ChatContext);

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      console.log('account created');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const location = useNavigate();
  const close = () => location('/');

  return (
    <section className='flex w-screen items-center justify-center bg-slate-800'>
      <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-emerald-900 shadow-xl rounded-2xl relative'>
        <h3 className='text-lg font-medium leading-6 font-ps2 text-yellow-500'>
          Create Account
        </h3>
        <img
          className='w-10 h-10 absolute top-4 right-5'
          src={swords}
          alt='two crossed swords'
        />
        <form onSubmit={handleLogin} method='post'>
          <div className='mt-4'>
            <p className='mb-1 text-sm text-gray-400'>Email</p>
            <input
              name='email'
              type='email'
              value={email}
              onChange={handleChange}
              placeholder='Enter email'
              required
              className='text-slate-700 bg-green-500 rounded-md py-2 px-4 w-full'
            />
          </div>
          <div className='mt-4'>
            <p className='mb-1 text-sm text-gray-400'>Username</p>
            <input
              name='username'
              type='text'
              // value={data.username}
              onChange={handleChange}
              placeholder='Enter username'
              required
              className='text-slate-700 bg-green-500 rounded-md py-2 px-4 w-full'
            />
          </div>
          <div className='mt-4'>
            <p className='mb-1 text-sm text-gray-400'>Password</p>
            <input
              name='password'
              type='password'
              // value={data.password}
              onChange={handleChange}
              placeholder='Password'
              required
              className='text-slate-700 bg-green-500 rounded-md py-2 px-4 w-full'
            />
          </div>
          <div className='mt-4'>
            <p className='mb-1 text-sm text-gray-400'>Confirm Password</p>
            <input
              name='passwordConfirm'
              type='password'
              // value={data.passwordConfirm}
              onChange={handleChange}
              placeholder='Confirm password'
              required
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
            <span className='text-xs text-slate-500 float-right mt-1'>
              Have an account? Log in
              <Link
                to='/users/login'
                className='text-yellow-700 hover:text-yellow-600 block w-8'
              >
                {' '}
                here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewUser;
