import { useEffect, useState } from "react"
import Chat from "./Chat"
import Logout from "./Logout"
import axios from 'axios'

const Chats = () => {
  // const [chatRooms, setChatRooms] = useState([])

  //   useEffect(()=> {
  //       axios.get('http://localhost:8000/api/chats', {withCredentials: true})
  //     .then(res => {
  //       // console.log(res.data)
  //       setChatRooms(res.data)
  //     })
  //     .catch(err => console.log(err))
  //   }, [])
    return(
        <>
        <h1>This is being rendered too</h1>
        <Chat/>
        <Logout/>
        </>
    )
}
export default Chats