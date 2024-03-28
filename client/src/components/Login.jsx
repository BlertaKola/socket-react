import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [user,setUser] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/login', user, { withCredentials: true })
            .then(res => {
                localStorage.setItem('userId', res.data.user._id);
                window.location.href = '/';
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className='login-title-chat'>Mern Chat</h1>
                <h2 className='login-title'>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="exampleInputEmail1" className="input-label">
                            <strong>Email </strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="input-field"
                            id="exampleInputEmail1"
                            onChange={(event) => setUser({...user,email: event.target.value})}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="exampleInputPassword1" className="input-label">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="input-field"
                            id="exampleInputPassword1"
                            onChange={(event) => setUser({...user,password: event.target.value})}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
                <p className='login-text'>Don't have an account?</p>
                <Link to='/register' className="register-link">Register</Link>
            </div>
        </div>
    )
}

export default Login
