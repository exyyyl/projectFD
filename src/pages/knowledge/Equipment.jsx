import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { equipmentData } from './Data';

const EquipmentContainer = styled('div')({
  padding: '20px',
  color: 'white',
  backgroundColor: '#1c1c1c',
  borderRadius: '20px',
  height: '80vh', // Уменьшенный размер основного контейнера
  display: 'flex',
  overflow: 'hidden', // Убираем основной скролл
});

const EquipmentList = styled(Box)({
  width: '20%',
  borderRight: '2px solid #333',
  overflowY: 'auto', // Добавляем скролл только для списка оборудования
  maxHeight: '100%', // Ограничиваем высоту списка
  display: 'flex',
  flexDirection: 'column', // Размещаем элементы вертикально
  alignItems: 'center',
});

const EquipmentDetails = styled(Box)({
  width: '80%',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  overflowY: 'auto', // Добавляем скролл только для блока с информацией
  maxHeight: '100%', // Ограничиваем высоту блока с информацией
});

const EquipmentImage = styled('img')({
  width: '80px',
  height: '80px',
  margin: '20px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const Equipment = () => {
  const [selectedEquipment, setSelectedEquipment] = React.useState(null);

  const handleItemClick = (equipment) => {
    setSelectedEquipment(equipment);
  };

  return (
    <EquipmentContainer>
      <EquipmentList>
        {equipmentData.map((item, index) => (
          <Grid item key={index} onClick={() => handleItemClick(item)} xs={12} style={{ width: '100%' }}>
            <EquipmentImage
              src={`/images/equipment/${item.image}`}
              alt={item.name}
            />
          </Grid>
        ))}
      </EquipmentList>

      <EquipmentDetails>
        {selectedEquipment ? (
          <div>
            <Typography variant="h4" gutterBottom>
              {selectedEquipment.name}
            </Typography>
            <Typography variant="body1">
              {selectedEquipment.description}
            </Typography>
          </div>
        ) : (
          <Typography variant="h5">
            Пожалуйста, выберите снаряжение из списка для отображения информации о нём
          </Typography>
        )}
      </EquipmentDetails>
    </EquipmentContainer>
  );
};

export default Equipment;
