import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Sidebar from './components/Sidebar';
import KnowledgeBase from './pages/KnowledgeBase';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import Ghosts from './pages/knowledge/Ghosts';
import CursedItems from './pages/knowledge/CursedItems';
import Equipment from './pages/knowledge/Equipment';
import Evidence from './pages/knowledge/Evidence';
import Maps from './pages/knowledge/Maps';
import Others from './pages/knowledge/Others';
import PatchNote from './pages/PatchNote';
// import './pages/globalStyles.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Sidebar />
        <div style={{ marginTop: '80px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<KnowledgeBase />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/patchnote/:id" element={<PatchNote />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ghosts" element={<Ghosts />} />
            <Route path="/cursed-items" element={<CursedItems />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/evidence" element={<Evidence />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/others" element={<Others />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
