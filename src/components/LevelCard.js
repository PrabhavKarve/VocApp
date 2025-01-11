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
  background: 'linear-gradient(135deg, #1e1e2f, #282c34)',
  color: '#FFF',
  boxShadow: '0 15px 25px rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 35px rgba(0, 0, 0, 0.6), 0 0 20px #00e6e6',
  },
}));

// Enhanced Button styling
const StyledButton = styled(Button)({
  minWidth: 50,
  minHeight: 50,
  borderRadius: '50%',
  background: 'linear-gradient(to right, #2196f3, #21cbf3)',
  color: '#FFF',
  fontWeight: 'bold',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
    background: 'linear-gradient(to right, #21cbf3, #2196f3)',
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
