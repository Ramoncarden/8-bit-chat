import React, { useState, useEffect } from 'react';
import Toast from './components/Toast';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import swords from './assets/swords.png';

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);

  const location = useNavigate();

  const close = () => location(-1);

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
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({ username }) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // dont return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-emerald-900 shadow-xl rounded-2xl relative'>
      <h3 className='text-lg font-medium leading-6 font-ps2 text-yellow-500'>
        Account
      </h3>
      <img
        className='w-10 h-10 absolute top-4 right-5'
        src={swords}
        alt='two crossed swords'
      />
      <form method='post'>
        <div className='mt-4'>
          <label className='mb-1 text-sm text-gray-400' htmlFor='email'>
            Email{' '}
          </label>
          <input
            id='email'
            className='text-slate-700 bg-green-500 rounded-md py-2 px-4 w-full'
            type='text'
            value={session.user.email}
            disabled
          />
        </div>
        <div className='mt-4'>
          <label className='mb-1 text-sm text-gray-400' htmlFor='username'>
            Username
          </label>
          <input
            id='username'
            className='text-slate-700 bg-green-500 rounded-md py-2 px-4 w-full'
            type='text'
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mt-6 space-x-2'>
          <button
            type='submit'
            onClick={() => updateProfile({ username, website })}
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
          <button
            className='inline-flex justify-center px-4 py-2 text-sm font-medium text-amber-600 bg-yellow-300 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500'
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;

// <div className='form-widget'>
//   <div>
//     <label htmlFor='email'>Email </label>
//     <input id='email' type='text' value={session.user.email} disabled />
//   </div>
//   <div>
//     <label htmlFor='username'>Name</label>
//     <input
//       id='username'
//       type='text'
//       value={username || ''}
//       onChange={(e) => setUsername(e.target.value)}
//     />
//   </div>
//   <div>
//     <label htmlFor='website'>Website</label>
//     <input
//       id='website'
//       type='website'
//       value={website || ''}
//       onChange={(e) => setWebsite(e.target.value)}
//     />
//   </div>

//   <div>
//     <button
//       className='button block primary'
//       onClick={() => updateProfile({ username, website })}
//       disabled={loading}
//     >
//       {loading ? 'Loading ...' : 'Update'}
//     </button>
//   </div>

//   <div>
//     <button
//       className='button block'
//       onClick={() => supabase.auth.signOut()}
//     >
//       Sign Out
//     </button>
//   </div>
// </div>
