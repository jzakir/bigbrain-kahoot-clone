import React from 'react';
import { render, screen } from '@testing-library/react';
import GradientButton from '../components/GradientButton';

describe('GradientButtonTests', () => {
  it('renders simple gradient button', () => {
    render(<GradientButton/>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  })
});
