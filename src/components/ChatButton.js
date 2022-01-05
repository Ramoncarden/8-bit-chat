import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatButton = () => {
  return (
    <div className='h-24 mt-16'>
      <Link className='flex w-2/3' to='/'>
        <span className='fa-layers fa-2x mr-8 ml-2 mt-1'>
          <FontAwesomeIcon
            className='text-yellow-400'
            icon='circle'
            size='2x'
          />
          <FontAwesomeIcon
            className='text-amber-800'
            icon='comment'
            size='lg'
            transform='right-4 down-.5'
          />
        </span>
        <span className='text-5xl font-pixeboy text-slate-200 ml-2 w-1/3'>
          Chat
        </span>
      </Link>
    </div>
  );
};

export default ChatButton;
