import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

describe('Test Nav Bar Contains NavBar', () => {
  it('Test', () => {
    render(
      <BrowserRouter>
      <Routes>
        <Route index element={<NavBar/>}/>
      </Routes>
    </BrowserRouter>);
    expect(screen.getByRole('button', { name: 'Log Out'} )).toBeInTheDocument();
  })
});