import React, { useState } from 'react';
import Check from '@/components/screens/Home/item/Check';
import cn from 'classnames';
import { BsTrash, BsPlusCircle, BsChevronDown } from 'react-icons/bs';

const TodoItem = ({ todo, changeTodo, removeTodo, addSubtask, isMainTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="rounded-2xl bg-gray-900 mb-4 p-5 w-full">
        <div className="flex items-center w-full">
          <button 
            onClick={() => changeTodo(todo._id)}
            className="flex-shrink-0 mr-4"
          >
            <Check isCompleted={todo.isCompleted} />
          </button>

          <div className="overflow-hidden mr-4">
            <span 
              className={cn('block truncate', { 
                'line-through': todo.isCompleted,
              })}
            >
              {todo.title}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {todo.subtask && todo.subtask.length > 0 && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-gray-400 hover:text-white transition-colors ease-in-out duration-300"
              >
                <BsChevronDown 
                  size={16} 
                  className={cn('transform transition-transform duration-300', {
                    'rotate-180': isExpanded
                  })}
                />
              </button>
            )}
            {isMainTask && !todo.isCompleted && (
              <button 
                onClick={addSubtask} 
                className="text-gray-400 hover:text-white transition-colors ease-in-out duration-300"
              >
                <BsPlusCircle size={22} />
              </button>
            )}
            <button onClick={() => removeTodo(todo._id)}>
              <BsTrash
                size={22}
                className="text-gray-400 hover:text-red-700 transition-colors ease-in-out duration-300"
              />
            </button>
          </div>
        </div>
      </div>

      <div 
        className={cn(
          'pl-6 transition-all duration-300 ease-in-out origin-top',
          {
            'opacity-100 max-h-[1000px]': isExpanded && todo.subtask && todo.subtask.length > 0,
            'opacity-0 max-h-0 overflow-hidden': !isExpanded || !todo.subtask || todo.subtask.length === 0
          }
        )}
      >
        {todo.subtask && todo.subtask.map((subtask) => (
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
    </div>
  );
};

export default TodoItem;