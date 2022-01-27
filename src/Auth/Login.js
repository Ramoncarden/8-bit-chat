import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import swords from '../assets/swords.png';
import { supabase } from '../supabaseClient';

const Login = () => {
  const location = useNavigate();
  const close = () => location('/');

  const { loading, logInAccount } = useContext(AuthContext);

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    logInAccount(email);
    close();
  };
  return (
    <section className='flex w-screen items-center justify-center bg-slate-800'>
      <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-emerald-900 shadow-xl rounded-2xl relative'>
        <h3 className='text-lg font-medium leading-6 font-ps2 text-yellow-500'>
          Welcome back
        </h3>
        <img
          className='w-10 h-10 absolute top-4 right-5'
          src={swords}
          alt='two crossed swords'
        />
        <form onSubmit={handleSubmit}>
          <div className='mt-4'>
            <p className='mb-1 text-sm text-gray-400'>Email</p>
            <input
              name='email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='text-slate-700 bg-green-500 rounded-md py-2 px-4 w-full'
            />
          </div>
          {/* <div className='mt-4'>
            <p className='mb-1 text-sm text-gray-400'>Password</p>
            <input
              name='password'
              type='password'
              required
              className='text-slate-700 bg-green-500 rounded-md py-2 px-4 w-full'
            />
          </div> */}

          <div className='mt-6 space-x-2'>
            <button
              type='submit'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-emerald-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500'
            >
              Login
            </button>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-amber-600 bg-yellow-300 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500'
              onClick={close}
            >
              Cancel
            </button>
            <span className='text-xs text-slate-500 float-right mt-1'>
              Need an account? Create one
              <Link
                className='text-yellow-700 hover:text-yellow-600 block w-8'
                to='/users/new'
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

export default Login;
