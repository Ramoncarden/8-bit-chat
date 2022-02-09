import { React, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ChatProvider } from './Context/ChatContext';
import AuthContext, { AuthProvider } from './Context/AuthContext';
import {
  faCheckSquare,
  faCircle,
  faComment,
  faGamepad,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import Aside from './Aside';
import ChatRoom from './components/ChatRoom';
import NoMatch from './NoMatch';
import NewRoom from './forms/NewRoom';
import NewConverstaion from './forms/NewConverstaion';
import NewUser from './Auth/NewUser';
import Login from './Auth/Login';
import Toast from './components/Toast';
import Account from './Account';
import ProtectedRoute from './components/ProtectedRoute';

library.add(faGamepad, faCheckSquare, faComment, faCircle, faCog, faSignOutAlt);

function useAside() {
  const matchRooms = useMatch('rooms/*');

  if (matchRooms === null) {
    return <Aside />;
  }
  return null;
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const useReactQuerySubscription = () => {
    useEffect(() => {
      const websocket = new WebSocket('wss://echo.websocket.org/');
      websocket.onopen = () => {
        console.log('connected');
      };

      return () => {
        websocket.close();
      };
    }, []);
  };

  return (
    <div className='App h-full flex flex-col sm:flex-row'>
      <AuthProvider>
        <ChatProvider>
          <Routes>
            <Route path='rooms/new' element={null} />
            <Route path='converstions/new' element={null} />
            <Route path='users/new' element={null} />
            <Route path='users/login' element={null} />
            <Route path='users/account' element={null} />
            <Route path='*' element={<Aside session={session} />} />
          </Routes>
          <Routes>
            <Route path='/' element={<Home session={session} />} />
            <Route path='rooms/*' element={<ChatRoom session={session} />} />
            <Route
              path='rooms/new'
              element={
                <ProtectedRoute session={session}>
                  <NewRoom />
                </ProtectedRoute>
              }
            />
            <Route path='users/*'>
              <Route path='new' element={<NewUser />} />
              <Route path='login' element={<Login />} />
              <Route
                path='account'
                element={
                  <ProtectedRoute session={session}>
                    {session ? (
                      <Account key={session.user.id} session={session} />
                    ) : null}
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path='conversations/new'
              element={
                <ProtectedRoute session={session}>
                  <NewConverstaion />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </ChatProvider>
      </AuthProvider>
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
