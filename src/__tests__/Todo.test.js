import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../components/Todo';

const mockOnChangeTodo = jest.fn();
const mockOnDeleteTodo = jest.fn();
const mockOnEditTodo = jest.fn();

const todoProps = {
  description: 'Test Todo',
  done: false,
  id: '1',
  onChangeTodo: mockOnChangeTodo,
  onDeleteTodo: mockOnDeleteTodo,
  onEditTodo: mockOnEditTodo,
};

describe('Todo Component', () => {
  it('should render the todo item', () => {
    render(<Todo {...todoProps} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('should call onChangeTodo when clicked', () => {
    render(<Todo {...todoProps} />);
    fireEvent.click(screen.getByText('Test Todo'));
    expect(mockOnChangeTodo).toHaveBeenCalledWith('1');
  });

  it('should call onDeleteTodo when delete button is clicked', () => {
    render(<Todo {...todoProps} />);
    fireEvent.click(screen.getByTitle('Löschen'));
    expect(mockOnDeleteTodo).toHaveBeenCalledWith('1', expect.any(Object));
  });

  it('should call onEditTodo when editing is finished', () => {
    render(<Todo {...todoProps} />);
    fireEvent.click(screen.getByTitle('Bearbeiten'));
    fireEvent.change(screen.getByDisplayValue('Test Todo'), { target: { value: 'Updated Todo' } });
    fireEvent.blur(screen.getByDisplayValue('Updated Todo'));
    expect(mockOnEditTodo).toHaveBeenCalledWith('1', 'Updated Todo');
  });
});
