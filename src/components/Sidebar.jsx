import React from 'react';
import { Toolbar, IconButton, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/Book';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person2Sharp';
import UpdateIcon from '@mui/icons-material/Update';
import { styled } from '@mui/system';

const NavBar = styled('div')({
  position: 'fixed',
  top: 0,
  zIndex: 1000,
  width: '100%',
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0',
});

const ToolbarContainer = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const NavButton = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#004b9a',
    borderRadius: '30px',
    transform: 'scale(1.05)',
    transition: 'all 0.3s ease-in-out',
  },
  margin: '0 10px',
  padding: '10px 20px',
  borderRadius: '30px',
  textTransform: 'none',
  '&.active': {
    backgroundColor: '#004b9a',
    transition: 'background-color 0.3s ease-in-out',
  },
}));

const IconOnlyButton = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#004b9a',
    borderRadius: '50%',
    transform: 'scale(1.05)',
    transition: 'all 0.3s ease-in-out',
  },
  margin: '0 5px', // Уменьшили отступ
  padding: '10px',
  '&.active': {
    backgroundColor: '#004b9a',
    transition: 'background-color 0.3s ease-in-out',
  },
}));

const Sidebar = () => {
  const location = useLocation();

  return (
    <NavBar>
      <ToolbarContainer>
        <NavButton
          component={Link}
          to="/"
          startIcon={<LibraryBooksIcon />}
          className={location.pathname === '/' ? 'active' : ''}
        >
          Библиотека
        </NavButton>
        <NavButton
          component={Link}
          to="/blog"
          startIcon={<NewspaperIcon />}
          className={location.pathname === '/blog' ? 'active' : ''}
        >
          Новости
        </NavButton>
        <IconOnlyButton
          component={Link}
          to="/profile"
          className={location.pathname === '/profile' ? 'active' : ''}
        >
          <PersonIcon />
        </IconOnlyButton>
        <IconOnlyButton
          component={Link}
          to="/update"
          className={location.pathname === '/update' ? 'active' : ''}
        >
          <UpdateIcon />
        </IconOnlyButton>
      </ToolbarContainer>
    </NavBar>
  );
};

export default Sidebar;
