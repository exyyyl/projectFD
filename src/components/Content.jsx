import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from '../pages/Blog';
import Profile from '../pages/Profile';
import KnowledgeBase from '../pages/KnowledgeBase';

const Content = () => {
  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
      <Routes>
        <Route path="/" element={<KnowledgeBase />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Content;
