import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomePageButton from '../components/HomePageButton';

export default function HomePage () {
  const navigate = useNavigate();
  return (
    <>
      <h1>HomePage!</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        <HomePageButton onClick={() => { navigate('/register') }}>Admin (Manage/Create Games)</HomePageButton>
        <br />
        <HomePageButton>Player (Join/Play Games)</HomePageButton>
      </div>
    </>
  );
}
