import React, { useState } from 'react';
import TodoItem from './item/TodoItem';
import CreateTodoField from './create-todo-field/CreateTodoField';

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

const Home = () => {
  const [todos, setTodos] = useState(data);

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
    const subtaskTitle = prompt('Enter the title for the new subtask:');
    if (subtaskTitle) {
      const newSubtask = {
        _id: `${parentId}-sub${(todos.find(todo => todo._id === parentId)?.subtask?.length || 0) + 1}`,
        title: subtaskTitle,
        isCompleted: false,
      };
      addSubtask(parentId, newSubtask);
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
    </div>
  );
};

export default Home;
