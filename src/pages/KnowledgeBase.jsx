import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import ghostItems from '../images/ghosts.png';
import cursedItems from '../images/ghosts.png';
import equipment from '../images/ghosts.png';

const cardData = [
  { title: 'Призраки', image: ghostItems, link: '/ghosts' },
  { title: 'Проклятые предметы', image: cursedItems, link: '/cursed-items' },
  { title: 'Оборудование', image: equipment, link: '/equipment' },
  { title: 'Улики', image: ghostItems, link: '/evidence' },
  { title: 'Карты', image: ghostItems, link: '/maps' },
  { title: 'Прочее', image: ghostItems, link: '/others' },
];

const CardGrid = styled(Grid)({
  padding: '20px',
});

const StyledCard = styled(Card)({
  width: '450px',
  height: '300px',
  margin: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '20px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  backgroundColor: '#2a2a2a',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: '160px',
  borderRadius: '20px 20px 0 0',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const StyledCardContent = styled(CardContent)({
  padding: '16px',
  textAlign: 'center',
});

const StyledTypography = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#fff',
});

const KnowledgeBase = () => {
  return (
    <CardGrid container spacing={2} justifyContent="center">
      {cardData.map((card, index) => (
        <Grid item key={index}>
          <Link to={card.link} style={{ textDecoration: 'none' }}>
            <StyledCard>
              <StyledCardMedia
                component="img"
                alt={card.title}
                image={card.image}
              />
              <StyledCardContent>
                <StyledTypography variant="h5">
                  {card.title}
                </StyledTypography>
              </StyledCardContent>
            </StyledCard>
          </Link>
        </Grid>
      ))}
    </CardGrid>
  );
};

export default KnowledgeBase;
