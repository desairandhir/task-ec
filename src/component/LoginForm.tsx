
// LoginForm.tsx
"use client"; // Specifies this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from Next.js
import axios, { AxiosError } from 'axios';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { setToken } from '../helpers/CookieManager'; // Import the function to set the JWT token

// Define the structure of the expected response
interface LoginResponse {
  token: string;
  message: string; // Adjust according to your actual API response
}

// Define the structure for possible error response
interface ErrorResponse {
  message?: string; // Optional message property
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // Initialize the useRouter hook

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setError(null); // Clear previous errors

    try {
      const response = await axios.post<LoginResponse>(
        'https://intern-task-api.bravo68web.workers.dev/auth/login',
        { email, password }
      );
    
      console.log(response.data); // Log the response to see its structure
    
      // Check if the token exists in the response
      if (response.data.token) {
        setToken(response.data.token); // Save the token
        setMessage('Login successful!'); // Show success message
        setError(null); // Clear any existing error
    
        // Redirect to the product listing page after successful login
        router.push('/products');
      } else {
        setError('Login failed. Token not received.');
      }
    
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>; // Assert the error type
      setError(axiosError.response?.data?.message || 'Login failed.');
      setMessage(''); // Clear success message if there's an error
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
