import React, { useState } from 'react';
import { Grid, Typography, Box, Modal, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { evidenceData } from './Data';

const EvidenceContainer = styled(Box)({
  padding: '40px',
  backgroundColor: '#1c1c1c',
  borderRadius: '20px',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const EvidenceGrid = styled(Grid)({
  maxWidth: '1200px',
  margin: '0 auto',
});

const EvidenceCard = styled(Card)({
  backgroundColor: '#333',
  color: 'white',
  width: '250px',
  height: '350px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
  },
});

const EvidenceImage = styled(CardMedia)({
  height: '200px',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
});

const EvidenceModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled(Box)({
  backgroundColor: '#1c1c1c',
  color: 'white',
  padding: '20px',
  borderRadius: '10px',
  width: '400px',
  textAlign: 'center',
});

const Evidence = () => {
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (evidence) => {
    setSelectedEvidence(evidence);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvidence(null);
  };

  return (
    <EvidenceContainer>
      <EvidenceGrid container spacing={4} justifyContent="center">
        {evidenceData.map((item, index) => (
          <Grid item key={index}>
            <EvidenceCard onClick={() => handleOpen(item)}>
              <EvidenceImage
                component="img"
                image={`/images/evidence/${item.image}`}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {item.name}
                </Typography>
              </CardContent>
            </EvidenceCard>
          </Grid>
        ))}
      </EvidenceGrid>

      <EvidenceModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContent>
          {selectedEvidence && (
            <>
              <Typography id="modal-title" variant="h4" gutterBottom>
                {selectedEvidence.name}
              </Typography>
              <Typography id="modal-description" variant="body1">
                {selectedEvidence.description}
              </Typography>
            </>
          )}
        </ModalContent>
      </EvidenceModal>
    </EvidenceContainer>
  );
};

export default Evidence;
