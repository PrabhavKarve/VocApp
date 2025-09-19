import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Enhanced LinearProgress with Stylish Updates
/*const ThickLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  backgroundColor: theme.palette.grey[300],
  '& .MuiLinearProgress-bar': {
    borderRadius: 6,
    background: 'linear-gradient(to right, #00e676, #00c853)',
  },
}));*/

// Enhanced Card styling for phenomenal appearance
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 360,
  width: '320px',
  margin: 'auto',
  padding: 20,
  borderRadius: '20px',
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(15px)',
  color: '#FFF',
  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3), 0 0 20px rgba(15, 118, 110, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(15, 118, 110, 0.1), rgba(5, 150, 105, 0.1))',
    pointerEvents: 'none',
  },
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(15, 118, 110, 0.4)',
  },
}));

// Enhanced Button styling
const StyledButton = styled(Button)({
  minWidth: 50,
  minHeight: 50,
  borderRadius: '50%',
  background: 'linear-gradient(45deg, #0f766e, #059669)',
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: '16px',
  boxShadow: '0 8px 25px rgba(15, 118, 110, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    background: 'linear-gradient(45deg, #059669, #0f766e)',
    boxShadow: '0 12px 35px rgba(15, 118, 110, 0.4)',
  },
});

/*const ProgressText = styled(Typography)({
  color: '#FFF', // Bright white color for visibility
  fontWeight: 'bold',
  fontSize: '0.85rem',
});*/

// Main LevelCard Component
const LevelCard = ({ levelId, levelName, userEmail, userName }) => {
  // Call onCardClick when the card is clicked
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('flash-card', { state: { levelId, levelName, userEmail, userName } });
  };

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div" style={{ fontWeight: '600' }}>
            {levelId} : {levelName}
          </Typography>
          <StyledButton variant="contained" onClick={handleButtonClick}>
            {'>>'}
          </StyledButton>
        </Box>

      </CardContent>
    </StyledCard>
  );
};

export default LevelCard;
