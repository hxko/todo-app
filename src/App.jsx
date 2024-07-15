import { useState } from 'react';
import './index.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="relative">
      <div className="bg-container pt-12">
        <div className="max-w-xl m-auto px-4">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;