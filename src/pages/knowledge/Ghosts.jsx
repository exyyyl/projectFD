import React, { useState } from 'react';
import { Grid, Typography, Checkbox, FormControlLabel, Tabs, Tab, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { ghosts, evidences, ghostDetails } from './Data';

const GhostsContainer = styled('div')({
  padding: '20px',
  color: 'white',
});

const MenuContainer = styled(Paper)({
  background: 'rgba(40, 40, 40, 0.9)',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(10px)',
});

const EvidenceSection = styled(Grid)({
  marginBottom: '20px',
});

const GhostList = styled(Grid)({
  marginTop: '20px',
});

const GhostInfoSection = styled('div')({
  marginLeft: '20px',
  padding: '20px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1))',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
});

const StyledTab = styled(Tab)({
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  borderRadius: '10px',
  transition: 'background-color 0.3s',
  '&.Mui-selected': {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const Ghosts = () => {
  const [selectedGhost, setSelectedGhost] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [evidenceStates, setEvidenceStates] = useState(Array(evidences.length).fill(0));

  const handleGhostClick = (ghost) => {
    setSelectedGhost(ghost);
    setSelectedTab(0);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCheckboxClick = (index) => {
    const newEvidenceStates = [...evidenceStates];
    newEvidenceStates[index] = (newEvidenceStates[index] + 1) % 3;
    setEvidenceStates(newEvidenceStates);
  };

  const renderGhostInfo = () => {
    if (!selectedGhost) {
      return <Typography>Пожалуйста, выберите призрака из списка для отображения информации о нём</Typography>;
    }

    const ghostInfo = ghostDetails[selectedGhost.name];

    return (
      <GhostInfoSection>
        <StyledTabs 
          value={selectedTab} 
          onChange={handleTabChange} 
          centered
        >
          <StyledTab label="Описание" />
          <StyledTab label="Поведение" />
          <StyledTab label="Стратегия" />
        </StyledTabs>
        <Box p={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px' }}>
          {selectedTab === 0 && <Typography>{ghostInfo.description}</Typography>}
          {selectedTab === 1 && <Typography>{ghostInfo.behavior}</Typography>}
          {selectedTab === 2 && <Typography>{ghostInfo.strategy}</Typography>}
        </Box>
      </GhostInfoSection>
    );
  };

  const getGhostOpacity = (ghost, evidenceStates) => {
    for (let i = 0; i < evidenceStates.length; i++) {
      if (evidenceStates[i] === 1 && !ghost.evidences.includes(evidences[i])) {
        return 0.2;
      }
      if (evidenceStates[i] === 2 && ghost.evidences.includes(evidences[i])) {
        return 0.2;
      }
    }
    return 1;
  };

  const getCheckboxStyle = (state) => {
    switch (state) {
      case 1: return { color: 'white' };
      case 2: return { color: 'red', textDecoration: 'line-through' };
      default: return { color: 'white' };
    }
  };

  return (
    <GhostsContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <MenuContainer>
            <EvidenceSection container spacing={2}>
              {evidences.map((evidence, index) => (
                <Grid item xs={6} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={evidenceStates[index] === 1} 
                        indeterminate={evidenceStates[index] === 2} 
                        onClick={() => handleCheckboxClick(index)}
                        style={getCheckboxStyle(evidenceStates[index])}
                      />
                    }
                    label={<Typography style={{ color: 'white' }}>{evidence}</Typography>}
                  />
                </Grid>
              ))}
            </EvidenceSection>
            <GhostList container spacing={2}>
              {ghosts.map((ghost, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Typography 
                    onClick={() => handleGhostClick(ghost)} 
                    style={{ 
                      cursor: 'pointer', 
                      padding: '10px',
                      borderRadius: '10px',
                      transition: 'background-color 0.3s, box-shadow 0.3s',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      opacity: getGhostOpacity(ghost, evidenceStates),
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {index + 1}. {ghost.name}
                  </Typography>
                </Grid>
              ))}
            </GhostList>
          </MenuContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          {renderGhostInfo()}
        </Grid>
      </Grid>
    </GhostsContainer>
  );
};

export default Ghosts;
