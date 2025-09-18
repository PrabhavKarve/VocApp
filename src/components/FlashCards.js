import React, { useState, useEffect, useRef  } from "react";
import FlippingCard from "./FlippingCard";
import { Button, Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import api_url from "../endpoint"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
import { Navigation } from 'swiper/modules';

const GradientBackground = styled(Box)({
  width: '100%',
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  position: 'relative',
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
});

const ButtonContainer = styled(Box)({
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
});

const StyledButton = styled(Button)({
  maxWidth: '100px',
  minWidth: '100px',
  padding: '15px',
  borderRadius: '15px',
  fontWeight: '700',
  fontSize: '14px',
  color: '#FFFFFF',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
  },
  '&.MuiButton-containedSuccess': {
    background: 'linear-gradient(45deg, #4caf50, #2e7d32)',
    '&:hover': {
      background: 'linear-gradient(45deg, #2e7d32, #4caf50)',
    },
  },
  '&.MuiButton-containedPrimary': {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    '&:hover': {
      background: 'linear-gradient(45deg, #764ba2, #667eea)',
    },
  },
  '&.MuiButton-containedError': {
    background: 'linear-gradient(45deg, #f44336, #c62828)',
    '&:hover': {
      background: 'linear-gradient(45deg, #c62828, #f44336)',
    },
  },
});

const CarouselContainer = styled(Box)({
  width: '70%',
  margin: '0 auto',
  padding: '40px',
  borderRadius: '25px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(102, 126, 234, 0.05))',
    pointerEvents: 'none',
  },
});

const Title = styled(Typography)({
  textAlign: 'center',
  fontSize: '2.5rem',
  fontWeight: '700',
  background: 'linear-gradient(45deg, #FFFFFF, #E8EAF6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '30px',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  position: 'relative',
  zIndex: 1,
});

const ProgressText = styled(Typography)({
  color: '#FFF', 
  fontWeight: '700',
  fontSize: '1rem',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
});

export default function FlashCards() {
  const [masteredCount, setMasteredCount] = useState(0);
  const location = useLocation();
  const { levelId, levelName, userEmail, userName } = location.state || {};
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index

  const swiperRef = useRef(null);
  const carouselRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleGreenClick = async () => {
    alert(currentIndex)
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
    /*setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < flashcards.length ? nextIndex : prevIndex; // Don't exceed the array length
    });*/
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
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

  /*const handleCarouselChange = (currentItem, pageIndex) => {
    setCurrentIndex(pageIndex); // Update the current index when carousel changes
  };*/

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
        {/*<Carousel 
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
            
        </Carousel>*/}

        <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        onSlideChange={(swiper) => handleSlideChange(swiper)}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance in ref
        >
        {flashcards.map((flashcard, index) => (
                  <SwiperSlide key={index}>
                    <FlippingCard
              key={flashcard.wordid}
              isFlipped={isFlipped}
              word={flashcard.word}
              meaning={flashcard.meaning}
            />
                  </SwiperSlide>
                ))}
        </Swiper>
      </CarouselContainer>
      <ButtonContainer>
        <StyledButton variant="contained" color="success" onClick={handleGreenClick}>Aware</StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleCardClick}>Flip</StyledButton>
        <StyledButton variant="contained" color="error" onClick={handleRedClick}>Unknown</StyledButton>
      </ButtonContainer>
      
      {/* Progress bar container */}
      <Box display="flex" alignItems="center" justifyContent="center" marginTop={3} width="100%" sx={{ position: 'relative', zIndex: 1 }}>
        <Box width="50%" marginRight={2} sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          padding: '8px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <LinearProgress 
            variant="determinate" 
            value={masteredCount} 
            sx={{
              height: 16,
              borderRadius: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '& .MuiLinearProgress-bar': { 
                background: 'linear-gradient(45deg, #4caf50, #2e7d32)',
                borderRadius: 8,
              }
            }} 
          />
        </Box>
        <Box minWidth={50}>
        <ProgressText variant="body2">
          {masteredCount >= 0 ? `${masteredCount}%` : "Loading..."}
          </ProgressText>
        </Box>
      </Box>
    </GradientBackground>
  );
}