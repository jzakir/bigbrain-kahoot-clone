import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomePageButton from '../components/HomePageButton';

export default function HomePage () {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', minHeight: '100vh' }}>
        <HomePageButton onClick={() => { navigate('/login') }}>Admin (Manage/Create Games)</HomePageButton>
        <br />
        <HomePageButton>Player (Join/Play Games)</HomePageButton>
      </div>
    </>
  );
}
