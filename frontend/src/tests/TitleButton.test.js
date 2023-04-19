import React from 'react';
import { render, screen } from '@testing-library/react';
import TitleButton from '../components/TitleButton';

describe('TitleButtonTest', () => {
  const title = 'hello World';

  it('renders simple text without button', () => {
    render(<TitleButton title={title}/>);
    expect(screen.getByText('hello World')).toBeInTheDocument();
  })

  it('renders simple text WITH a cool button', () => {
    render(<TitleButton title={'Questions'} button buttonText={'Create New Question'}/>);
    expect(screen.getByRole('button', { name: 'Create New Question' })).toBeInTheDocument();
  })
});
