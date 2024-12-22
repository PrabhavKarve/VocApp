import React from 'react';
import { styled } from '@mui/system';
import LevelCard from './LevelCard';
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";

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
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  });

  const Title = styled(Typography)({
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
    marginBottom: '20px', // Add spacing below the title
  });

  const PageBackground = styled('div')({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column', // Arrange children vertically
    alignItems: 'center', // Center horizontally
    justifyContent: 'flex-start', // Start from the top
    padding: '20px',
    background: 'linear-gradient(135deg, #232526, #414345)', // Dark gradient background
  });

  return (
    <PageBackground>
      <Title>Levels</Title>
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
      <p style={{ color: '#d3d3d3', textAlign: 'center' }}>
        NOTE: The level names are the names or references of some amazing hip-hop artists as tribute to their vocabulary and lyricism.
      </p>
    </PageBackground>
  );
};

export default Levels;