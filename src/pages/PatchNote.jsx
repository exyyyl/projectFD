import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Box, Typography } from '@mui/material';

const PatchNote = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/news/${id}`);
        setContent(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке патчноутов:', error);
        setError('Произошла ошибка при загрузке патчноута.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatchNote();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="20px" color="white" backgroundColor="#121212" borderRadius="10px">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box padding="20px" color="white" backgroundColor="#121212" borderRadius="10px">
      <Typography variant="h4" gutterBottom>
        {content.title}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: content.description }} />
    </Box>
  );
};

export default PatchNote;
