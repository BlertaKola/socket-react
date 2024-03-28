import { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';
import io from 'socket.io-client';
import Message from './components/Message';
import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Chats from './components/Chats';
import ChatRoom from './components/ChatRoom';
function App() {

  const userId = localStorage.getItem('userId');
  const [socket] = useState(io('http://localhost:8000'));






  // useEffect(() => {
  //   socket.on('message', (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);



  // const sendMessage = () => {
  //   if (isRegistered && messageText.trim() !== "") {
  //     socket.emit('sendMessage', { name: name, text: messageText });
  //     setMessageText('');
  //   }
  // };

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected to server");
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }, []);





  return (
    <>
      <div className="App">
        <BrowserRouter>
          {/* <h1>{userId}</h1> */}

          <Routes>
            {
              userId ?
                <>
                  <Route path='/' element={<Chats />}></Route>
                  <Route path='/chats' element={<Chats/>} />
                  <Route path='/chats/create' element={<Chat />} />
                  <Route path='/chats/:id' element={<ChatRoom/>} />


                </>
                :
                <>
                  <Route path='/' element={<Register />}></Route>
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/chat/create' element={<Register />} />
                  <Route path='/chats/create' element={<Register />} />

                </>
            }
            {/* <Route path='/' element={<Application />}></Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/chat/create' element={<Chat />} /> */}
          </Routes>
        </BrowserRouter>

      </div>
    </>
  );
}

export default App;
