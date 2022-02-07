// import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const DiscordButton = () => {
  // const location = useLocation();
  return (
    <form>
      <Link to='/users/login'>
        <button className='bg-red-800 px-4 py-2 rounded-full flex items-center hover:bg-yellow-400 mx-auto text-white hover:text-black'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={21}
            height={16}
            viewBox='0 4 71 55'
            aria-labelledby='title'
            aria-describedby='desc'
            role='img'
          >
            <title>Mail</title>
            <desc>A solid styled icon from Orion Icon Library.</desc>
            <path
              data-name='layer1'
              fill='#FFFFFF'
              d='M2 14.7v34.4l17.2-17.5L2 14.7zm42.8 16.9L62 49.1V14.7L44.8 31.6z'
            ></path>
            <path
              data-name='layer2'
              fill='#FFFFFF'
              d='M59.1 12H5l27 26.6L59.1 12z'
            ></path>
            <path
              data-name='layer1'
              fill='#FFFFFF'
              d='M32 44.2l-10-9.8L4.7 52h54.6L42 34.4l-10 9.8z'
            ></path>
          </svg>
          <span className='text-sm font-bold ml-2'>Login with Email</span>
        </button>
      </Link>
    </form>
  );
};

export default DiscordButton;
