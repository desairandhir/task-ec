"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import axios, { AxiosError } from 'axios';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { setToken } from '../helpers/CookieManager'; 

interface LoginResponse {
  token: string;
  message: string; 
}

interface ErrorResponse {
  message?: string; 
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(''); 
    setError(null); 

    try {
      const response = await axios.post<LoginResponse>(
        'https://intern-task-api.bravo68web.workers.dev/auth/login',
        { email, password }
      );
    
      console.log(response.data); 

      if (response.data.token) {
        setToken(response.data.token); 
        setMessage('Login successful!'); 
        setError(null); 
    
        router.push('/products');
      } else {
        setError('Login failed. Token not received.');
      }
    
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>; 
      setError(axiosError.response?.data?.message || 'Login failed.');
      setMessage(''); 
    }
    
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Login
      </Typography>

      {/* Email Field */}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
        variant="outlined"
      />

      {/* Password Field */}
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        variant="outlined"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '20px' }}
      >
        Login
      </Button>

      {/* Success or Error Message */}
      {message && <Alert severity="success" sx={{ marginTop: '20px' }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ marginTop: '20px' }}>{error}</Alert>}
    </Box>
  );
};

export default LoginForm;
