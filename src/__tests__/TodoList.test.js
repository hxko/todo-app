import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the header', () => {
    render(<TodoList />);
    expect(screen.getByText('TODO')).toBeInTheDocument();
  });

  it('should add a new todo', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText('Neues Todo...'), { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByText('Neues Todo...'));
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('should toggle the todo status', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText('Neues Todo...'), { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByText('Neues Todo...'));
    fireEvent.click(screen.getByText('New Todo'));
    expect(screen.getByText('New Todo')).toHaveClass('line-through');
  });

  it('should delete a todo', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText('Neues Todo...'), { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByText('Neues Todo...'));
    fireEvent.click(screen.getByTitle('Löschen'));
    expect(screen.queryByText('New Todo')).not.toBeInTheDocument();
  });
});
