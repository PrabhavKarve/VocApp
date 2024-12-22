import React, { useState } from 'react';
import { Card, CardContent as MuiCardContent, Typography , Button, Box} from '@mui/material';
import { styled } from '@mui/system';

const FlippingCardContainer = styled('div')({
  display: 'flex',
  perspective: '1000px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const FlippingCardInner = styled('div')(({ isFlipped }) => ({
  position: 'relative',
  width: '300px',
  height: '400px',
  textAlign: 'center',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const FlippingCardFace = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
});

const FlippingCardFront = styled(FlippingCardFace)({
  backgroundColor: '#f8f8f8',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const FlippingCardBack = styled(FlippingCardFace)({
  backgroundColor: '#f8f8f8',
  transform: 'rotateY(180deg)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const CardContent = styled(MuiCardContent)({
    backgroundColor: '#f0f0f0',
    display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  });

  const CenteredContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  });

const FlippingCard = ({ cards }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };


  const ButtonContainer = styled(Box)({
    position: 'absolute',
    bottom: '90px', // Adjust as needed
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px', // Add some space between the buttons
  });

  return (
    <FlippingCardContainer >
      <FlippingCardInner isFlipped={isFlipped}>
        <FlippingCardFront>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%' }}>
            <CenteredContent>
              <Typography variant="h5" component="div">
              { cards }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is the front side of the card.
              </Typography>
              </CenteredContent>
              
            </CardContent>
            
          </Card>
          
        </FlippingCardFront>
        <FlippingCardBack>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%' }}>
                <CenteredContent>
              <Typography variant="h5" component="div">
              { cards } Back Side
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is the back side of the card.
              </Typography>
              </CenteredContent>
            </CardContent>
          </Card>
        </FlippingCardBack>
      </FlippingCardInner>
      <ButtonContainer>
                <Button variant="contained" color="success" style={{maxWidth: '75px',  minWidth: '75px'}} >Green</Button>
                <Button variant="contained" color="primary" style={{maxWidth: '75px',  minWidth: '75px'}} onClick={handleCardClick}>Blue</Button>
                <Button variant="contained" color="error" style={{maxWidth: '75px', minWidth: '75px'}} >Red</Button>
      </ButtonContainer>
    </FlippingCardContainer>
    
  );
};

export default FlippingCard;
