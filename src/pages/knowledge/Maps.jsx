import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tanglewood from '../../images/point-hope.jpg';
import edgefield from '../../images/point-hope.jpg';
import './../styles/globalStyles.css'; // Импорт глобального CSS

const maps = [
  { name: '6 Tanglewood Drive', image: tanglewood, category: 'small' },
  { name: '42 Edgefield Road', image: edgefield, category: 'small' },
  { name: '10 Ridgeview Court', image: tanglewood, category: 'small' },
  { name: 'Grafton Farmhouse', image: tanglewood, category: 'medium' },
  { name: '13 Willow Street', image: tanglewood, category: 'medium' },
  { name: 'Point Hope', image: tanglewood, category: 'medium' },
  { name: 'Bleasdale Farmhouse', image: tanglewood, category: 'large' },
  { name: 'Brownstone High School', image: tanglewood, category: 'large' },
  { name: 'Sunny Meadows', image: tanglewood, category: 'large' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #121212;
  color: white;
  padding: 20px;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.active ? '#2196F3' : 'white')};
  font-size: 16px;
  margin: 0 10px;
  cursor: pointer;
  padding: 10px 20px;
  position: relative;
  &:hover {
    background: #1a237e;
    border-radius: 5px;
  }
  &::after {
    content: '';
    display: ${(props) => (props.active ? 'block' : 'none')};
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 100%;
    height: 2px;
    background: #2196F3;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 300px;
  background: #1f1f1f;
  border-radius: 10px;
  overflow-y: auto;
  max-height: 760px; /* Устанавливаем максимальную высоту */
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Card = styled.div`
  background: #333;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #444;
  }
`;

const CardImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;

const CardName = styled.div`
  flex: 1;
`;

const Viewer = styled.div`
  flex: 1;
  background: #1f1f1f;
  border-radius: 10px;
  margin-left: 20px;
  padding: 20px;
  overflow-y: auto;
  max-height: 700px; /* Устанавливаем максимальную высоту */
`;

const ViewerImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 20px;
  color: #888;
`;

const Maps = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    document.body.classList.add('no-scroll'); // Добавляем класс no-scroll к body
    return () => {
      document.body.classList.remove('no-scroll'); // Удаляем класс no-scroll из body при размонтировании
    };
  }, []);

  const getFilteredMaps = () => {
    if (activeCategory === 'all') {
      return maps;
    }
    return maps.filter(map => map.category === activeCategory);
  };

  const filteredMaps = getFilteredMaps();

  return (
    <Container>
      <Navigation>
        <NavButton active={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>All</NavButton>
        <NavButton active={activeCategory === 'small'} onClick={() => setActiveCategory('small')}>Small</NavButton>
        <NavButton active={activeCategory === 'medium'} onClick={() => setActiveCategory('medium')}>Medium</NavButton>
        <NavButton active={activeCategory === 'large'} onClick={() => setActiveCategory('large')}>Large</NavButton>
      </Navigation>
      <Content>
        <Sidebar>
          <CardList>
            {filteredMaps.map((map) => (
              <Card key={map.name} onClick={() => setSelectedMap(map)}>
                <CardImage src={map.image} alt={map.name} />
                <CardName>{map.name}</CardName>
              </Card>
            ))}
          </CardList>
        </Sidebar>
        <Viewer>
          {selectedMap ? (
            <>
              <ViewerImage src={selectedMap.image} alt={selectedMap.name} />
              <h2>{selectedMap.name}</h2>
            </>
          ) : (
            <Placeholder>Select a map to view</Placeholder>
          )}
        </Viewer>
      </Content>
    </Container>
  );
};

export default Maps;
