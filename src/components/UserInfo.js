import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserInfo = ({ session }) => {
  return (
    <section className='mb-2 w-full flex flex-row justify-end absolute bottom-0 left-1'>
      <header className='h-10 w-4/6'>
        <h2 className='text-xs text-yellow-700 float-left ml-3 pt-1'>
          {session.user.email}
        </h2>
      </header>
      <div className='w-2/6 flex justify-end items-start mr-3'>
        <Link to='/account'>
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
