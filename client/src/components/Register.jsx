import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({name: "", email: "", password: "", confirmPassword: ""})
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/register', user, { withCredentials: true })
            .then(result => {
                console.log(result);
                if (result.data === "Already registered") {
                    alert("E-mail already registered! Please Login to proceed.");
                    navigate('/login');
                } else {
                    console.log(result.data.user._id)
                    localStorage.setItem('userId', result.data.user._id);
                    window.location.href = '/chats';
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="register-container">

            <div className="register-content">
                <h1 className='login-title-chat'>Mern Chat</h1>

                <h2 className='register-title'>Register</h2>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label htmlFor="exampleInputName" className="input-label">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="input-field"
                            id="exampleInputName"
                            onChange={(event) => setUser({...user, name: event.target.value})}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="exampleInputEmail1" className="input-label">
                            <strong>Email </strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="input-field"
                            id="exampleInputEmail1"
                            onChange={(event) => setUser({...user, email: event.target.value})}
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
                            onChange={(event) => setUser({...user, password: event.target.value})}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="exampleInputPassword2" className="input-label">
                            <strong>Confirm Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="input-field"
                            id="exampleInputPassword2"
                            onChange={(event) => setUser({...user, confirmPassword: event.target.value})}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Register</button>
                </form>
                <p className='register-text'>Already have an account?</p>
                <Link to='/login' className="login-link">Login</Link>
            </div>
        </div>

    )
}

export default Register
