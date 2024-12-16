import React from 'react';
import Check from './Check';
import cn from 'classnames';
import { BsTrash } from 'react-icons/bs';
import AddSubtaskButton from './AddSubtaskButton';

const TodoItem = ({ todo, changeTodo, removeTodo, addSubtask, isMainTask }) => {
  return (
    <div className="mb-4">
      {/* Основной элемент задачи */}
      <div className="flex items-center justify-between mb-4 rounded-2xl bg-gray-900 p-5 w-full">
        <button className="flex items-center" onClick={() => changeTodo(todo._id)}>
          <Check isCompleted={todo.isCompleted} />
          <span className={cn({ 'line-through': todo.isCompleted })}>{todo.title}</span>
        </button>
        <div className="flex items-center">
            {isMainTask && !todo.isCompleted && (
              <AddSubtaskButton onClick={addSubtask} />
            )}
          <button onClick={() => removeTodo(todo._id)}>
            <BsTrash
              size={22}
              className="text-gray-400 hover:text-red-700 transition-colors ease-in-out duration-300"
            />
          </button>
        </div>
      </div>

      {/* Рендеринг подзадач */}
      {todo.subtask && todo.subtask.length > 0 && (
        <div className="pl-6">
          {todo.subtask.map((subtask) => (
            <TodoItem
              key={subtask._id}
              todo={subtask}
              changeTodo={changeTodo}
              removeTodo={removeTodo}
              addSubtask={() => addSubtask(todo._id)}
              isMainTask={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
