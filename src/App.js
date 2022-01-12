import { React, useState } from 'react';
import Home from './Home';
import './App.css';
// import { MessageProvider } from "./Context/MessageContext";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckSquare,
  faCircle,
  faComment,
  faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import Aside from './Aside';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import NoMatch from './NoMatch';
import { ChatProvider } from './Context/ChatContext';
import NewRoom from './forms/NewRoom';
import NewConverstaion from './forms/NewConverstaion';

library.add(faGamepad, faCheckSquare, faComment, faCircle);

function useAside() {
  const matchRooms = useMatch('rooms/*');

  if (matchRooms === null) {
    return <Aside />;
  }
  return null;
}

function App() {
  return (
    <div className='App h-full flex flex-col sm:flex-row'>
      {/* <MessageProvider> */}
      <ChatProvider>
        <Routes>
          <Route path='rooms/new' element={null} />
          <Route path='converstions/new' element={null} />
          <Route path='*' element={<Aside />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='rooms/*' element={<ChatRoom />} />
          <Route path='rooms/new' element={<NewRoom />} />
          <Route path='conversations/new' element={<NewConverstaion />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </ChatProvider>
      {/* </MessageProvider> */}
    </div>
  );
}

export default App;

// TODO:
// Create a Login
// Turn Routes to private and visible depending if user is logged in

/* User Stories
 User is prompted to enter a username when he visits the chat app. The username will be stored in the application
 User can see an input field where he can type a new message
 By pressing the enter key or by clicking on the send button the text will be displayed in the chat box alongside his username (e.g. John Doe: Hello World!)

 Bonus features
 The messages will be visible to all the Users that are in the chat app (using WebSockets)
 When a new User joins the chat, a message is displayed to all the existing Users
 Messages are saved in a database
 User can send images, videos and links which will be displayed properly
 User can select and send an emoji
 Users can chat in private
 Users can join channels on specific topics */
