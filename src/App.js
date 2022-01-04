import { React } from 'react';
import Home from './Home';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckSquare,
  faCircle,
  faComment,
  faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import Aside from './Aside';

library.add(faGamepad, faCheckSquare, faComment, faCircle);

function App() {
  return (
    <div className='App h-full flex flex-col sm:flex-row'>
      <Aside />
      <Home />
    </div>
  );
}

export default App;

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
