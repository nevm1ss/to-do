'use client'; // Важно добавить, так как используем useState

import React, { useState } from 'react';
import TodoItem from '@/components/screens/Home/item/TodoItem';
import CreateTodoField from '@/components/screens/Home/create-todo-field/CreateTodoField';

const data = [
  {
    _id: 'wefw23',
    title: 'Finish the essay collaboration',
    isCompleted: false,
    subtask: [
      {
        _id: 'wefw23-sub1',
        title: 'Research materials for essay',
        isCompleted: false,
      },
      {
        _id: 'wefw23-sub2',
        title: 'Write the introduction',
        isCompleted: false,
      },
    ],
  },
  {
    _id: 'wefw23232',
    title: 'Read next chapter of the book',
    isCompleted: false,
  },
  {
    _id: 'wefw2qwefcev3',
    title: 'Send the finished assignment',
    isCompleted: false,
  },
];

// Ваш существующий код Home компонента
const Home = () => {
  const [todos, setTodos] = useState(data);
  const [newSubtaskData, setNewSubtaskData] = useState({
    parentId: null,
    title: '',
    isFormVisible: false
  });

  const changeTodo = (id) => {
    const updateTodos = (tasks) =>
      tasks.map((task) => {
        if (task._id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        if (task.subtask) {
          return { ...task, subtask: updateTodos(task.subtask) };
        }
        return task;
      });

    setTodos(updateTodos(todos));
  };

  const removeTodo = (id) => {
    const updateTodos = (tasks) =>
      tasks
        .map((task) => {
          if (task.subtask) {
            return { ...task, subtask: updateTodos(task.subtask) };
          }
          return task;
        })
        .filter((task) => task._id !== id);

    setTodos(updateTodos(todos));
  };

  const addSubtask = (parentId, newSubtask) => {
    setTodos(prevData =>
      prevData.map(item =>
        item._id === parentId
          ? {
              ...item,
              subtask: [...(item.subtask || []), newSubtask],
            }
          : item
      )
    );
  };

  const handleAddSubtask = (parentId) => {
    setNewSubtaskData({
      parentId,
      title: '',
      isFormVisible: true
    });
  };

  const handleSubmitSubtask = (e) => {
    e.preventDefault();
    if (newSubtaskData.title.trim()) {
      const newSubtask = {
        _id: `${newSubtaskData.parentId}-sub${(todos.find(todo => todo._id === newSubtaskData.parentId)?.subtask?.length || 0) + 1}`,
        title: newSubtaskData.title,
        isCompleted: false,
      };
      addSubtask(newSubtaskData.parentId, newSubtask);
      setNewSubtaskData({ parentId: null, title: '', isFormVisible: false });
    }
  };

  return (
    <div className="text-white w-4/5 mx-auto">
      <h1 className="text-2xl font-bold text-start mb-10">Todo for junior</h1>
      <CreateTodoField setTodos={setTodos} />
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          changeTodo={changeTodo}
          removeTodo={removeTodo}
          addSubtask={() => handleAddSubtask(todo._id)}
          isMainTask={true}
        />
      ))}

      {newSubtaskData.isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <form onSubmit={handleSubmitSubtask}>
              <input
                type="text"
                value={newSubtaskData.title}
                onChange={(e) => setNewSubtaskData({
                  ...newSubtaskData,
                  title: e.target.value
                })}
                placeholder="Enter subtask title"
                className="bg-gray-700 text-white p-2 rounded w-full mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewSubtaskData({
                    parentId: null,
                    title: '',
                    isFormVisible: false
                  })}
                  className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;