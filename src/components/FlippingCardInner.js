import React from 'react';
import { Card, CardContent as MuiCardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const FlippingCardInnerContainer = styled('div')(({ isFlipped }) => ({
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

const CenteredContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
});

const FlippingCardInner = ({ isFlipped, handleCardClick, cards }) => {
  return (
    <FlippingCardInnerContainer isFlipped={isFlipped} onClick={handleCardClick}>
      <FlippingCardFront>
        <Card sx={{ height: '100%' }}>
          <MuiCardContent sx={{ height: '100%' }}>
            <CenteredContent>
              <Typography variant="h5" component="div">
                {cards}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is the front side of the card....
              </Typography>
            </CenteredContent>
          </MuiCardContent>
        </Card>
      </FlippingCardFront>
      <FlippingCardBack>
        <Card sx={{ height: '100%' }}>
          <MuiCardContent sx={{ height: '100%' }}>
            <CenteredContent>
              <Typography variant="h5" component="div">
                {cards} Back Side
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is the back side of the card.
              </Typography>
            </CenteredContent>
          </MuiCardContent>
        </Card>
      </FlippingCardBack>
    </FlippingCardInnerContainer>
  );
};

export default FlippingCardInner;
