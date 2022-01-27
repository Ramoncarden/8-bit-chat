import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className='w-full'>
      <form onSubmit={logout}>
        <button
          type='submit'
          className='w-full text-gray-600 bg-gradient-to-r from-lime-100 via-lime-200 to-lime-400 hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
        >
          <FontAwesomeIcon
            className='text-amber-700 mr-1'
            icon='sign-out-alt'
            size='lg'
          />
          Logout
        </button>
      </form>
    </div>
  );
};

export default LogoutButton;
