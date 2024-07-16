import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';



/**
 * TodoList component that renders a list of todos.
 * The component maintains its own state using the useState hook.
 * It uses the useCallback hook to memoize the changeTodoStatus and deleteTodo callback functions to improve performance.
 */
const TodoList = () => {
  // Initialize the todos state with the localStored todos or the initialTodos array.
  const [todos, setTodos] = useState(() => localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []); // State to store the list of todos
  const [newTodo, setNewTodo] = useState(''); // State to store the new todo being added
  const [currentTab, setCurrentTab] = useState('all'); // State to manage the current tab

  // Calculate the number of open todos.
  const openTodosCount = todos.filter(todo => !todo.done).length; // Count of todos that are not done
  const doneTodosCount = todos.filter(todo => todo.done).length;
  const allTodosCount = todos.length;
  /**
   * changeTodoStatus function that updates the todos state by toggling the done property of the todo with the given id.
   * The function is memoized using the useCallback hook to prevent unnecessary re-renders.
   * @param {number} id - The id of the todo to toggle.
   */
  const changeTodoStatus = useCallback((id) => {
    // Update the todos state by toggling the done property of the todo with the given id
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  /**
   * deleteTodo function that updates the todos state by removing the todo with the given id.
   * The function is memoized using the useCallback hook to prevent unnecessary re-renders.
   * @param {number} id - The id of the todo to delete.
   * @param {Event} e - The event object.
   */
  const deleteTodo = useCallback((id, e) => {
    e.stopPropagation(); // Prevent the event from bubbling up the DOM tree
    // Update the todos state by removing the todo with the given id
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  /**
   * addTodo function that adds a new todo to the list of todos.
   * @param {Event} e - The event object.
   */0
  const addTodo = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Add a new todo to the list of todos
    setTodos(prevTodos => [...prevTodos, { id: uuidv4(), description: newTodo, done: false }]);
    setNewTodo(''); // Clear the input field for the new todo
  }

  const editTodo = useCallback((id, newDescription) => {
    console.log("saved")
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, description: newDescription } : todo
      )
    );
  }, []);

  // Filter todos based on the current tab
  const filteredTodos = todos.filter(todo => {
    if (currentTab === 'done') return todo.done;
    if (currentTab === 'notdone') return !todo.done;
    return true;
  });

  // Delete all completed todos
  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.done));
  }
  // Delete all todos
  const clearAll = () => {
    setTodos([]);
  }
  // Local Storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="shadow-sm hover:shadow-lg rounded-sm">

      {/* Render the header */}
      <div className=" text-white py-8 font-semibold">
        <h1 className="text-3xl font-bold tracking-[1.25em] mb-4">TODO</h1>

        {/* Add New Todo */}
        <form className='mt-2' onSubmit={addTodo}>
          <div>
            <label htmlFor="hs-trailing-button-add-on" className="sr-only">Label</label>
            <div className="flex shadow-sm">
              <input
                placeholder="Neues Todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)} // Update the newTodo state when the input value changes
                type="text"
                name="hs-trailing-button-add-on"
                className="text-gray-600 py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              />
              <button
                type="submit"
                className="whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                Neues Todo...
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-white rounded-md overflow-hidden">
        <ul>
          {/* Render the list of todos */}
          {filteredTodos.map(({ id, description, done }) => (
            <Todo
              // Pass the changeTodoStatus and deleteTodo callback functions as props.
              onChangeTodo={changeTodoStatus} // Callback function to toggle the done status of a todo
              onDeleteTodo={deleteTodo} // Callback function to delete a todo
              onEditTodo={editTodo}
              key={id} // Unique key for each todo
              id={id} // Id of the todo
              description={description} // Description of the todo
              done={done} // Done status of the todo
            />
          ))}
        </ul>
        {/* Controls */}
        <div className=" px-4 flex justify-between items-center bg-slate-50 font-semibold text-xs text-gray-400 ">
          <button onClick={() => clearAll()} className="py-2 pl-4 hover:text-gray-600">Alle Löschen</button>
          <div className="flex">
            <button
              onClick={() => setCurrentTab('all')}
              className={`py-3 px-2 ${currentTab === 'all' ? 'text-gray-600 font-bold' : ''}  hover:text-gray-600`}
            >
              Alle
              <span className=" bg-gray-300 text-white px-2 py-1 text-xs font-bold rounded-full ml-1">{allTodosCount}</span>
            </button>
            <button
              onClick={() => setCurrentTab('done')}
              className={`py-2 px-2 ${currentTab === 'done' ? 'text-gray-600 font-bold' : ''} hover:text-gray-600`}
            >
              Erledigt
              <span className=" bg-gray-300 text-white px-2 py-1 text-xs font-bold rounded-full ml-1">{doneTodosCount}</span>
            </button>
            <button
              onClick={() => setCurrentTab('notdone')}
              className={`py-2 px-2 ${currentTab === 'notdone' ? 'text-gray-600 font-bold' : ''} hover:text-gray-600`}
            >
              Offen
              <span className=" bg-gray-300 text-white px-2 py-1 text-xs font-bold rounded-full ml-1">{openTodosCount}</span>
            </button>
          </div>
          <button onClick={() => clearCompleted()} className="py-2 pl-4 hover:text-gray-600">Erledigte Löschen</button>
        </div>
      </div>

    </div>

  );
};

export default TodoList;
