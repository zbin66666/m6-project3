import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Auth = () => {
    return (
        <>
            <h1>Deliciousss</h1>
            <div className='auth'>
                <Login />
                <Register />
            </div>
        </>
    )
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { username, password });
            setCookies('access_token', response.data.token);
            window.localStorage.setItem('userID', response.data.userID);
            navigate('/');
        }
        catch (err) {
            console.error(err);
        }
    }
    return <div id="loginForm">
        <p>Already have an account</p>
        <Form
            onSubmit={onSubmit}
            label='LOGIN'
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
        />
    </div>
};

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/register', { username, password });
            alert('Registration completed! Login now');
        }
        catch (err) {
            console.error(err);
        }
    };
    return <div id="registerForm">
        <p>Don't have an account</p>
        <Form
            onSubmit={onSubmit}
            label='REGISTER'
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
        />
    </div>
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
    return (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className='form-group'>
                    {/* <label htmlFor='username'>Username: </label> */}
                    <input type='text' id='username' value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Your Username' />
                </div>
                <div className='form-group'>
                    {/* <label htmlFor='password'>Password: </label> */}
                    <input type='password' id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Your Password' />
                </div>
                <button type='submit'>{label}</button>
            </form>
        </div>
    )
}

export default Auth