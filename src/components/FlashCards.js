import React, { useState, useEffect, useRef  } from "react";
import Carousel from "react-elastic-carousel";
import FlippingCard from "./FlippingCard";
import { Button, Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import api_url from "../endpoint"

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 },
];

const GradientBackground = styled(Box)({
  width: '100%',
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(145deg, #232526, #414345)', 
  animation: 'gradientBackground 15s ease infinite',
  '@keyframes gradientBackground': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  backgroundSize: '200% 200%',
});

const ButtonContainer = styled(Box)({
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
});

const StyledButton = styled(Button)({
  maxWidth: '85px',
  minWidth: '85px',
  padding: '12px',
  borderRadius: '14px',
  fontWeight: '600',
  color: '#FFFFFF',
  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35)',
  },
});

const CarouselContainer = styled(Box)({
  width: '70%',
  margin: '0 auto',
  padding: '30px',
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #ECEFF1, #CFD8DC)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
});

const Title = styled(Typography)({
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: '20px',
  textShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
});

const ProgressText = styled(Typography)({
  color: '#FFF', 
  fontWeight: 'bold',
  fontSize: '0.85rem',
});

export default function FlashCards() {
  const [masteredCount, setMasteredCount] = useState(0);
  const location = useLocation();
  const { levelId, levelName, userEmail, userName } = location.state || {};
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index

  // Create a ref to the carousel instance
  const carouselRef = useRef(null);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleGreenClick = async () => {
    console.log(userName)
    const currentFlashcard = getCurrentFlashcard();

    const url = api_url + '/isKnown'

    const formData = {
      word : currentFlashcard.word,
      wordId : currentIndex + 1,
      wordLevelId : levelId,
      wordUserId : userEmail,
      isKnown : "known"
    }

    try {
      const response = await axios.post(url, formData);
  
      if (response.data && response.data.mastered_count !== undefined) {
        setMasteredCount(response.data.mastered_count);
      }
    } catch (error) {
      console.error('Error updating flashcard status:', error);
    }

    moveToNextCard();
  };

  const handleRedClick = async () => {
    const currentFlashcard = getCurrentFlashcard();

    const url = api_url + '/isKnown'

    const formData = {
      word : currentFlashcard.word,
      wordId : currentIndex + 1,
      wordLevelId : levelId,
      wordUserId : userEmail,
      isKnown : "unknown"
    }

    try {
      const response = await axios.post(url, formData);
      if (response.data && response.data.mastered_count !== undefined) {
        setMasteredCount(response.data.mastered_count);
      }
    } catch (error) {
      console.error('Error updating flashcard status:', error);
    }

    moveToNextCard();
  };

  // Function to move to the next card
  const moveToNextCard = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < flashcards.length ? nextIndex : prevIndex; // Don't exceed the array length
    });
  };

  const getFlashCards = async () => {
    try {
      const url = api_url + '/getFlashcards_level_n';
      const response = await axios.post(url, { levelId });
      setFlashcards(response.data.data);
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };

  const handleCarouselChange = (currentItem, pageIndex) => {
    setCurrentIndex(pageIndex); // Update the current index when carousel changes
  };

  const fetchMasteredCount = async () => {
    try {
      const url = api_url + '/getMasteredCount';
      const response = await axios.post(url, { userEmail, levelId });
      if (response.data && response.data.mastered_count !== undefined) {
        setMasteredCount(response.data.mastered_count); // Set the fetched percentage
      }
    } catch (error) {
      console.error('Error fetching mastered count:', error);
    }
  };

  useEffect(() => {
    fetchMasteredCount();
    getFlashCards();
  });

  useEffect(() => {
    // Whenever currentIndex changes, move the carousel to the correct slide
    if (carouselRef.current) {
      carouselRef.current.goTo(currentIndex);
    }
  }, [currentIndex]); // Dependency on currentIndex

  // Function to get the currently displayed flashcard
  const getCurrentFlashcard = () => {
    return flashcards[currentIndex];
  };

  return (
    <GradientBackground>
      <Title>Level {levelId}: {levelName}</Title>
      <CarouselContainer>
        <Carousel 
          ref={carouselRef} // Attach the ref here
          breakPoints={breakPoints} 
          pagination={false} 
          onChange={handleCarouselChange}
          itemsToShow={1}
        >
          {flashcards.map((flashcard) => (
            <FlippingCard
              key={flashcard.wordid}
              isFlipped={isFlipped}
              word={flashcard.word}
              meaning={flashcard.meaning}
            />
          ))}
        </Carousel>
      </CarouselContainer>
      <ButtonContainer>
        <StyledButton variant="contained" color="success" onClick={handleGreenClick}>Aware</StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleCardClick}>Flip</StyledButton>
        <StyledButton variant="contained" color="error" onClick={handleRedClick}>Unknown</StyledButton>
      </ButtonContainer>
      
      {/* Progress bar container */}
      <Box display="flex" alignItems="center" justifyContent="center" marginTop={2} width="100%">
        <Box width="50%" marginRight={1}>
          <LinearProgress 
            variant="determinate" 
            value={masteredCount} 
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': { backgroundColor: '#00e676' }
            }} 
          />
        </Box>
        <Box minWidth={35}>
        <ProgressText variant="body2">
          {masteredCount >= 0 ? `${masteredCount}%` : "Loading..."}
          </ProgressText>
        </Box>
      </Box>
    </GradientBackground>
  );
}