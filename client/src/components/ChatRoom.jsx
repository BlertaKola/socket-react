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

    useEffect(() => {
        // Fetch initial messages for the chat room
        axios.get(`http://localhost:8000/api/messages/${id}`, { withCredentials: true })
            .then(res => {
                setMessages(res.data);
            })
            .catch(err => console.log(err));

        // Listen for new messages from the server
        socket.on("message", (message) => {
            // Check if the received message belongs to the current chat room
            if (message.chat === id) {
                setMessages(prevMessages => [...prevMessages, message]);
            }
        });

        // Clean up event listener
        return () => {
            socket.off("message");
        };
    }, [id]);

    const sendMessage = () => {
        if (messageText.trim() !== "") {
            // Send message to the server
            axios.post(`http://localhost:8000/api/messages`, {
                text: messageText,
                user: userId,
                chat: id
            }, { withCredentials: true })
            .then(res => {
                // Clear the message input field
                setMessageText("");
            })
            .catch(err => console.log(err)); // Handle errors
        }
    };

    return (
        <>
            <h5>Start chatting</h5>
            <div className="messages-container">
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        name={message.user.name} // Assuming user name is available in message.user.name
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
