import React, { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { CursedItem } from './Data';

const CursedContainer = styled('div')({
  padding: '20px',
  color: 'white',
  backgroundColor: '#1c1c1c',
  borderRadius: '20px',
  height: '80vh',
  display: 'flex',
  overflow: 'hidden',
});

const CursedList = styled(Box)({
  width: '25%', // Увеличиваем ширину списка
  borderRight: '2px solid #333',
  overflowY: 'auto',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '20px',
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#555',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#777',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#333',
    borderRadius: '5px',
  },
});

const CursedDetails = styled(Box)({
  width: '75%',
  padding: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  overflowY: 'auto',
  maxHeight: '100%',
});

const CursedItemBox = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '20px', // Увеличиваем отступы внутри блоков
  cursor: 'pointer',
  borderRadius: '10px',
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: '#333',
    transform: 'scale(1.05)',
  },
});

const CursedImage = styled('img')({
  width: '60px', // Увеличиваем размер иконок
  height: '60px',
  marginRight: '20px', // Увеличиваем отступы между иконкой и текстом
  borderRadius: '50%',
});

const CursedItems = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <CursedContainer>
      <CursedList>
        {CursedItem.map((item, index) => (
          <CursedItemBox 
            key={index} 
            onClick={() => handleItemClick(item)} 
            style={{
              backgroundColor: selectedItem?.name === item.name ? '#444' : 'transparent'
            }}
          >
            <CursedImage
              src={item.image}
              alt={item.name}
            />
            <Typography variant="body1" fontWeight="bold" color="white">
              {item.name}
            </Typography>
          </CursedItemBox>
        ))}
      </CursedList>

      <CursedDetails>
        {selectedItem ? (
          <div>
            <Typography variant="h4" gutterBottom>
              {selectedItem.name}
            </Typography>
            <Typography variant="body1">
              {selectedItem.description}
            </Typography>
          </div>
        ) : (
          <Typography variant="h5">
            Пожалуйста, выберите предмет из списка для отображения информации о нём
          </Typography>
        )}
      </CursedDetails>
    </CursedContainer>
  );
};

export default CursedItems;
