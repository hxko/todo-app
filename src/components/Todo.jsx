import React, { memo, useEffect } from 'react';

const Todo = memo(({ description, done, id, onChangeTodo, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newDescription, setNewDescription] = React.useState(description);

  const handleEditButtonClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  // Save on Input Blur
  const handleInputBlur = () => {
    setIsEditing(false);
    onEditTodo(id, newDescription); // Save the edited description
  };

  const handleInputChange = (e) => {
    setNewDescription(e.target.value);
  };
  // Save on "Enter"
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onEditTodo(id, newDescription);
    }
  };
  // Update newDescription whenever description prop changes (e.g., after an edit)
  useEffect(() => {
    setNewDescription(description);
  }, [description]);

  return (
    <li
      className='py-3 px-4 flex justify-between items-center cursor-pointer bg-white [&:not(:last-child)]:border-b border-gray-200 hover:bg-slate-50'
      onClick={() => onChangeTodo(id)}
    >
      <div className="flex items-center">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={done}
          readOnly
          className="mr-4 accent-pink-500 custom-checkbox"
        />
        {/* Todo Description */}
        {isEditing ? (
          <input
            type="text"
            value={newDescription}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            autoFocus
            className="text-sm font-semibold border border-gray-300 rounded px-2 py-1 focus:border-pink-500 focus:outline-none transition"
          />
        ) : (
          <h3 className={done ? 'text-sm line-through' : 'text-sm font-semibold'}>
            {description}
          </h3>
        )}
      </div>
      <div>
        {/* Edit Button */}
        <button
          title="Bearbeiten"
          onClick={handleEditButtonClick}
          className='mr-3'
        >
          {/* Edit Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 hover:text-pink-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>

        {/* Delete Button */}
        <button
          title="Löschen"
          onClick={(e) => onDeleteTodo(id, e)}
        >
          {/* Delete Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 hover:text-pink-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </li>
  );
});

export default Todo;
