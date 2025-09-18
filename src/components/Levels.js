import React from 'react';
import { styled } from '@mui/system';
import LevelCard from './LevelCard';
import { Typography, Button } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Link, Outlet } from 'react-router-dom';

const Levels = () => {
  const location = useLocation();
  const { userEmail, userName } = location.state || {};

  const levels = [
    { id: 1, name: 'Slim' },
    { id: 2, name: 'Kr$' },
    { id: 3, name: 'Roco' },
    { id: 4, name: 'K.' },
    { id: 5, name: 'Encore' },
    { id: 6, name: 'Cent' },
    { id: 7, name: 'Cube' },
    { id: 8, name: 'Makaveli' },
    { id: 9, name: 'Siddhu' },
    { id: 10, name: 'DOC' },
    { id: 11, name: 'EZ - E' },
    { id: 12, name: 'LL - J' },
    { id: 13, name: 'Rak' },
    { id: 14, name: 'Lak' },
    { id: 15, name: 'Cole' },
    { id: 16, name: 'Don' },
    { id: 17, name: 'YoYo' },
    { id: 18, name: 'Calm' },
    { id: 19, name: 'Bilal' },
    { id: 20, name: 'Notorious' },
    { id: 21, name: '3000' },
    { id: 22, name: 'RaGa' },
    { id: 23, name: 'Rraa' },
    { id: 24, name: 'Dwayne' },
    { id: 25, name: 'Ye' },
    { id: 26, name: 'Dino' },
    { id: 27, name: 'Panther' },
    { id: 28, name: 'Feuerstein' },
    { id: 29, name: 'JZ' },
    { id: 30, name: 'KRS' },
    { id: 31, name: 'Naved' },
    { id: 32, name: 'Paradox' },
    { id: 33, name: 'Stan' },
    { id: 34, name: 'DoGG' },
  ];

  const LevelsContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(15px)',
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
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    marginBottom: '30px',
    position: 'relative',
    zIndex: 1,
  });

  const PageBackground = styled('div')({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
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

  const NavBar = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
  });

  const NavButton = styled(Button)({
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '10px',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '8px 20px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
    },
  });

  // Check if the current path is the reviews or tests path
  const isReviewsPath = location.pathname === '/home/reviews';
  const isTestsPath = location.pathname === '/home/tests';
  const isLevelPath = location.pathname === '/home/flash-card';

  return (
    <PageBackground>
      <NavBar>
        <NavButton component={Link} to="/home">Home</NavButton>
        <NavButton component={Link} to="/home/tests" state={{ userName: userName }}>Tests</NavButton>
        <NavButton component={Link} to="/home/reviews">Review</NavButton>
      </NavBar>
      <Outlet />

      {!isReviewsPath && !isTestsPath && !isLevelPath && ( // Only render levels if not on the reviews or tests path
        <div><Title>Levels</Title>
        <LevelsContainer>
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              levelId={level.id}
              levelName={level.name}
              userEmail={userEmail}
              userName={userName}
            />
          ))}
        </LevelsContainer>
        </div>
      )}
      <p style={{ 
        color: 'rgba(255, 255, 255, 0.8)', 
        textAlign: 'center',
        fontSize: '14px',
        fontStyle: 'italic',
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '600px',
        margin: '20px auto 0'
      }}>
        NOTE: The level names are the names or references of some amazing hip-hop artists as tribute to their vocabulary and lyricism.
      </p>
    </PageBackground>
  );
};

export default Levels;
