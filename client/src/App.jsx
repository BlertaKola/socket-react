import { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';
import io from 'socket.io-client';
import Message from './components/Message';
import axios from 'axios';
function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [name, setName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [socket] = useState(io('http://localhost:8000'));

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleRegistration = (e) => {
    // e.preventDefault()
    if (name.trim() !== "") {
      // axios.post('http://localhost:8000/api/chats', name)
      //   .then(res => {
      //     console.log(res.data)
      //     setIsRegistered(true);
      //   })
      //   .catch(err => console.log(err))
      setIsRegistered(true);
      console.log("User registered:", name);
    }
  };

  const sendMessage = () => {
    if (isRegistered && messageText.trim() !== "") {
      socket.emit('sendMessage', { name: name, text: messageText });
      setMessageText('');
    }
  };

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
        <h1>MERN Chat </h1>
        {!isRegistered ? (
          <div className="registration-form">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"/>
            <button onClick={handleRegistration}>Register</button>
          </div>
        ) : (
          <>
            <div className="messages">
              {messages.map((message, index) => (
                <Message key={index} name={message.name} text={message.text} isCurrentUser={message.name === name} />
              ))}
            </div>
            <div className="input-box">
              <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Type your message..."/>
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
