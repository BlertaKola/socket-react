import { useState, useEffect } from "react"
const Chat = () => {
    const [form, setForm] = useState({
        name: "",
        isRegistered: false
    })
   
    const [submitted, setSubmitted] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("CLICKED THE FORM")
    }

    return(
        <>
        {
            submitted ? <h1>You submitted</h1>  : 
            <><form onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder="My name..." onChange={(e) => setForm({...form, name:e.target.value})} value={form.name}/>
                <input type="submit" value="Start Chatting"/>
            </div>
         </form>
        </>
        }
        
        </>
    )
}
export default Chat