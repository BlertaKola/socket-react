import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { io } from "socket.io-client"

const Chat = () => {
    const userId = localStorage.getItem("userId")
    const socket = io('http://localhost:8000')

    const [form, setForm] = useState({
        name: "", user: userId
    })

    const [chatRooms, setChatRooms] = useState([]) 
    const [updated, setUpdated] = useState(false)
    const [newRoomId, setNewRoomId] = useState(""); 

    useEffect(() => {
        axios.get('http://localhost:8000/api/chats', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setChatRooms(res.data);
            })
            .catch(err => console.log(err));

        // Listen for 'updateChatRooms' event from the server
        socket.on('updateChatRooms', () => {
            setUpdated(!updated);
        });

        // Clean up event listener
        return () => {
            socket.off('updateChatRooms');
        };
    }, [updated]);

    const updatedForm = {...form, users: [userId]}
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/chats', updatedForm, {withCredentials: true})
            .then(res => {
                console.log(res)
                setNewRoomId(res.data._id);
                console.log("TESt")
                console.log(newRoomId)
                socket.emit('newChatRoom', res.data);
                navigate(`/chats/${newRoomId}`)
            })
            .catch(err => console.log(err))
    }


    const joinChatRoom = (roomID, userId) => {
        console.log(roomID)
        console.log("Clicked")
        axios.put(`http://localhost:8000/api/chats/${roomID}`,{user: userId}, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                socket.emit('joinChatRoom', roomID);
                navigate(`/chats/${roomID}`)
            })
            .catch(err => console.log(err))

    }
    

    return (
        <>
            <h1>redirected heree</h1>

            {chatRooms.map((room, index)=>{
                return(
                    <div  key={index}>
                        <h5>{room.name}</h5>
                        {room.users.includes(userId) ? (
                            <Link to={`/chats/${room._id}`}>start chatting</Link>
                        ) : (
                            <button onClick={() => joinChatRoom(room._id, userId)}>Join</button>
                        )}
                    </div>
                )
            })}

            <><form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Chat room name..." onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} />
                    <input type="submit" value="Create Chat Room" />
                </div>
            </form>
            </>

        </>
    )
}
export default Chat