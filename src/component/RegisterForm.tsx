"use client"; // Specifies this is a Client Component

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { TextField, Button, Typography, Box, Alert, Link } from '@mui/material';

interface RegisterResponse {
  message: string;
}

interface ErrorResponse {
  message?: string;
}

interface RegisterFormProps {
  onSuccess: () => void; // Define the prop type
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<RegisterResponse>(
        'https://intern-task-api.bravo68web.workers.dev/auth/signup',
        { email, password }
      );
      setMessage(response.data.message || 'User registered successfully!');
      setError(null); // Clear any previous errors
      onSuccess(); // Call the onSuccess callback to show the login form
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || 'Registration failed.');
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
        Register
      </Typography>

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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '20px' }}
      >
        Register
      </Button>

      {message && <Alert severity="success" sx={{ marginTop: '20px' }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ marginTop: '20px' }}>{error}</Alert>}

      <Typography align="center" sx={{ marginTop: '20px' }}>
        Already have an account? 
        <Link href="#" onClick={onSuccess} variant="body1" sx={{ marginLeft: '5px' }}>
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
