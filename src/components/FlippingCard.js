import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import '../App.css';

const FlippingCardInner = styled('div')(({ isFlipped }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '80%',
  height: '250px',
  textAlign: 'center',
  transition: 'transform 0.6s ease-in-out',
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  perspective: '1000px', // Improves the 3D effect
  cursor: 'pointer', // Change cursor to pointer on hover
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  borderRadius: '16px',
}));

const FlippingCardFace = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  borderRadius: '16px',
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
  },
});

// Front Card Styling
const FlippingCardFront = styled(FlippingCardFace)({
  background: 'linear-gradient(145deg, #1e1e2f, #282c34)', // Cool gradient
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  border: '2px solid #ffffff',
  borderRadius: '16px',
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: '1.2em',
  letterSpacing: '1px',
});

// Back Card Styling
const FlippingCardBack = styled(FlippingCardFace)({
  background: 'linear-gradient(145deg, #1e1e2f, #282c34)', // Different gradient for back
  color: '#ffffff',
  transform: 'rotateY(180deg)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  border: '2px solid #ffffff',
  borderRadius: '16px',
  fontSize: '1em',
  letterSpacing: '0.5px',
});



const FlippingCard = ({ isFlipped, handleCardClick, currentCard, cards, word, meaning }) => {
  return (
      <FlippingCardInner isFlipped={isFlipped} onClick={handleCardClick}>
        <FlippingCardFront>
            <Typography className='para' variant="h5" component="div" >
              {word}
              </Typography>
        </FlippingCardFront>
        <FlippingCardBack>
        <Typography className='para'v variant="body1" color="text.success">
                {meaning}
        </Typography>
        </FlippingCardBack>
      </FlippingCardInner>
    
  );
};

export default FlippingCard;
