import React from 'react';
import { render, screen } from '@testing-library/react';
import WhiteBox from '../components/WhiteBox';

describe('Test a White Box', () => {
  it('renders simple gradient button', () => {
    render(<WhiteBox/>);
    expect(screen.getByRole('box')).toBeInTheDocument();
  })
});