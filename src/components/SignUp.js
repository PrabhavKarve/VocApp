import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import api_url from "../endpoint"

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    key: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Form Data Submitted:', formData);

    if (formData.confirmPassword === formData.password) {

      axios.post(api_url + '/signup', formData)
        .then(res => {
            console.log("signup req sent")
            if (res.data === "exist") {
                alert("User already exists");
            } else if (res.data.message === "User registered successfully") {
                navigate("/home", { state: { id: formData.email } });
            }
        })
        .catch(e => {
            alert("Wrong details");
            console.log(e);
        });
    }
  };

  return (
    <div style={{ padding: '40px' }}>
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px',
        paddingTop: '30px',
        paddingBottom: '30px',
        margin: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.4)',
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
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
            pointerEvents: 'none',
          },
        }}
      >
        <Typography component="h1" variant="h4" sx={{ 
          fontWeight: '700', 
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          mb: 2,
          textAlign: 'center'
        }}>
          Create an Account
        </Typography>
        <Typography variant="body2" sx={{ 
          textAlign: 'center', 
          margin: '10px',
          color: '#666',
          fontSize: '14px'
        }}>
            Already have an account?{' '}
            <Link to="/" style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              fontWeight: '600',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}>
              Sign In
            </Link>
          </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="first-name"
            onChange={handleChange}
            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="last-name"
            onChange={handleChange}
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
            autoComplete="new-password"
            onChange={handleChange}
            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
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
              borderRadius: 3,
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#fff',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(45deg, #764ba2, #667eea)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
    </div>
    
  );
};

export default SignUpPage;
