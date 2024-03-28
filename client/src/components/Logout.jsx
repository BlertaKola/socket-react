import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
const navigate = useNavigate();
    const logOut = () => {
        console.log("CLICKED")
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
        .then(res => {
            localStorage.removeItem('userId');
            window.location.reload();
            
            navigate('/');
        })
        .catch(err => console.log(err));
       
        
    }

    return (
        <button onClick={logOut}>Log Out</button>
    )
}
export default Logout;