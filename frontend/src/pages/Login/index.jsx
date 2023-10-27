import { useState } from 'react';
import { TextField, Button, Typography, Link, Card } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showAlert, API_BASE_URL } from '../function'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterLinkClick = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post (`${API_BASE_URL}/api/v1/auth/login`, {
                username,
                password,
            });
            const token = response.data.data;
            localStorage.setItem('token', token);
            console.log('Login successful', response.data);
            showAlert('success', 'Successfully log in', '');
            navigate('/homepage');
        } catch (error) {
            console.error('Login error', error.message);
            showAlert('error', 'Login Failed', `<b>[CODE] ${error.code}</b><br>Please check your username and password`);
        }
    };

    return (
        <Card style={{ textAlign: 'center', margin: '20px auto', padding: '30px', maxWidth: '400px' }}>
        <Typography variant="h4" gutterBottom>
        Login
        </Typography>
        <TextField
          label="username"
          variant="filled"
          fullWidth
          margin="normal"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
         label="Password"
         type="password"
         variant="filled"
         fullWidth
         margin="normal"
         placeholder="Enter your password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '20px'}}>
         Login
         </Button>
         <Typography style={{ marginTop: '10px', paddingTop: '10px', }}>
         <Link href="#" onClick={handleRegisterLinkClick}>
          Register here if you dont have an account
         </Link>
        </Typography>
       </Card>
    )
}


export default LoginForm;