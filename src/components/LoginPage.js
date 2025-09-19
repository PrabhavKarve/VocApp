import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api_url from "../endpoint"

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

    if (formData.email && formData.password) {
      axios.post(api_url + '/login', formData)
        .then((res) => {
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

  const handleGuestLogin = () => {
    axios.post(api_url + '/login', {
      email: 'guest',
      password: 'guest'
    })
        .then((res) => {
          console.log("login req sent");
          if (res.data.message === "Invalid email or password") {
            alert("Invalid credentials. Please try again.");
          } else if (res.data.message === "Login successful") {
            const user = res.data.user;  // Get user details from response
            navigate("/home", { state: { userEmail: "guest", userName: user } });
          }
        })
        .catch((e) => {
          alert("Login failed. Please check your details.");
          console.log(e);
        });

  };

  return (
    <div style={{ padding: '40px' }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          background: 'linear-gradient(135deg, #0f766e 0%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          paddingTop: '30px',
          paddingBottom: '30px',
          margin: 'auto',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(15, 118, 110, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            padding: 4,
            borderRadius: 4,
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400,
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(15, 118, 110, 0.05), rgba(5, 150, 105, 0.05))',
              pointerEvents: 'none',
            },
          }}
        >
          <Typography component="h1" variant="h4" sx={{ 
            fontWeight: '700', 
            background: 'linear-gradient(45deg, #0f766e, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2,
            textAlign: 'center'
          }}>
            Welcome Back
          </Typography>
          
          <Box sx={{ 
            textAlign: 'center', 
            mb: 3,
            p: 2,
            backgroundColor: 'rgba(15, 118, 110, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(15, 118, 110, 0.3)',
            boxShadow: '0 4px 15px rgba(15, 118, 110, 0.2)'
          }}>
            <Typography variant="h6" sx={{ 
              color: '#0f766e', 
              fontWeight: '600',
              display: 'inline'
            }}>
              Visitors?{' '}
            </Typography>
            <Link 
              to="#" 
              onClick={handleGuestLogin} 
              style={{ 
                color: '#0f766e', 
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'inline',
                padding: '6px 12px',
                backgroundColor: 'rgba(15, 118, 110, 0.1)',
                borderRadius: '6px',
                border: '2px solid #0f766e',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0f766e';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(15, 118, 110, 0.1)';
                e.target.style.color = '#0f766e';
              }}
            >
              Enter as guest
            </Link>
          </Box>
          
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
              value={formData.email} // Bind value for controlled input
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
              value={formData.password} // Bind value for controlled input
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
                borderRadius: 3,
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#fff',
                background: 'linear-gradient(45deg, #0f766e, #059669)',
                boxShadow: '0 8px 25px rgba(15, 118, 110, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(45deg, #059669, #0f766e)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(15, 118, 110, 0.4)',
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
