import { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';
import io from 'socket.io-client';
import Message from './components/Message';
import axios from 'axios';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Application from './components/Application';
function App() {
  // const [messages, setMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([])
  const [joinedChats, setJoinedChats] = useState([])
  const [chat, setChat] = useState("")
  // const [messageText, setMessageText] = useState("");
  const [name, setName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [socket] = useState(io('http://localhost:8000'));


  // useEffect(()=>{
  //   axios.get('http://localhost:8000/api/chats')
  //     .then(res => {
  //       console.log(res.data)
  //       setChatRooms(res.data)
  //     })
  //     .catch(err => console.log(err))

    
      
  // },[])
  

  // useEffect(() => {
  //   socket.on('message', (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);

  // const handleRegistration = (e) => {
  //   e.preventDefault()
  //   if (name.trim() !== "") {
  //     axios.post('http://localhost:8000/api/users', {name: name})
  //       .then(res => {
  //         console.log(res.data)
  //         console.log("User registered:", name);
  //         setIsRegistered(true);
  //       })
  //       .catch(err => console.log(err))
  //     // setIsRegistered(true);
  //   }
  // };

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
        {/* <h1>MERN Chat </h1>
        {!isRegistered ? (
          <div className="registration-form">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"/>
            <button onClick={handleRegistration}>Register</button>
          </div>
        ) : (
          <>
            
          </>
        )} */}


        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Application/>}></Route>
          </Routes>
        </BrowserRouter>

      </div>
    </>
  );
}

export default App;
