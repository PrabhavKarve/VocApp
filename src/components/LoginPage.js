import React, { useState }  from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Login Form Data:', formData);

    // Assuming formData contains `email` and `password`
    if (formData.email && formData.password) {
        // Send POST request to login endpoint
        axios.post('http://localhost:5000/login', formData)
            .then((res) => {
                console.log("login req sent")
                if (res.data.message === "Invalid email or password") {
                  alert("Invalid credentials. Please try again.");
              } else if (res.data.message === "Login successful") {
                  const user = res.data.user;  // Get user details from response
                  navigate("/home", { state: { userEmail: formData.email, userName: user } });
              }
            })
            .catch((e) => {
                alert("Login failed. Please check your details.");
                console.log(e);
            });
    } else {
        alert("Please enter both email and password.");
    }
};

  return (
    <div style={{ padding: '40px' }}>
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        background: 'linear-gradient(135deg, #e3f2fd 30%, #90caf9 90%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '15px',
        paddingTop: '20px',
        paddingBottom: '20px',
        margin: 'auto'
      }}
    >
      <Box
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: '600', color: '#333', mb: 2 }}>
          Welcome Back
        </Typography>
        <Typography component="body1"  sx={{ fontWeight: '600', color: '#333', mb: 2 }}>
          Designed by Prabhav
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 3, textAlign: 'center' }}>
          Please sign in to continue
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
    <Typography variant="body2" sx={{ textAlign: 'center', margin: '10px' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'primary.main', textDecoration: 'underline' }}>
              Sign Up
            </Link>
          </Typography>
    </div>
  );
};

export default LoginPage;
