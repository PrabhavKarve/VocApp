import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

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

      axios.post('http://localhost:5000/signup', formData)
        .then(res => {
            console.log("signup req sent")
            if (res.data === "exist") {
                console.log("server responded")
                alert("User already exists");
            } else if (res.data === "notexist") {
                console.log("server responded")
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
    <div style={{ padding: '30px' }}>
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        background: 'linear-gradient(135deg, #e3f2fd 30%, #90caf9 90%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Box
        sx={{
          padding: 3,
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
        <Typography component="h1" variant="h4" sx={{ fontWeight: '600', color: '#333' }}>
          Create an Account
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', margin: '10px' }}>
            Don't have an account?{' '}
            <Link to="/" style={{ color: 'primary.main', textDecoration: 'underline' }}>
              Sign Up
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
              borderRadius: 2,
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
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
