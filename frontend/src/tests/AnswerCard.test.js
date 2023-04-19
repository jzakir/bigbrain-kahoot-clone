import React from 'react';
import { render, screen } from '@testing-library/react';
import AnswerCard from '../components/AnswerCard';

describe('Test AnswerCard Contains textbox and checkbox to edit answer', () => {

  it('Test', () => {
    const answer = {
      answer: 'Test Answer',
      answerId: 5
    }
    render(
      <AnswerCard answer={answer}/>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  })
});