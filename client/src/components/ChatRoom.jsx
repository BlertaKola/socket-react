import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Message from "./Message";
import axios from "axios";

const socket = io("http://localhost:8000");

const ChatRoom = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const userId = localStorage.getItem("userId");
    const [update, setUpdated] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/messages/${id}`, { withCredentials: true })
            .then(res => {
                setMessages(res.data);
                
            })
            .catch(err => console.log(err));

        socket.on("message", (message) => {
            setUpdated(!update)
        });

        return () => {
            socket.off("message");
        };
    }, [update]);

    const sendMessage = () => {
        if (messageText.trim() !== "") {
            axios.post(`http://localhost:8000/api/messages`, {
                text: messageText,
                user: userId,
                chat: id
            }, { withCredentials: true })
            .then(res => {
                socket.emit('sendMessage', {
                    text: messageText,
                    user: userId,
                    chat: id
                });
                setMessageText("");
            })
            .catch(err => console.log(err)); 
        }
    };

    return (
        <>
            <h5>Start chatting {id}</h5>
            <div className="messages-container">
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        name={message.user.name} 
                        text={message.text}
                    />
                ))}
            </div>
            <div className="message-input-container">
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
    );
};

export default ChatRoom;
