import React from 'react';
import TodoItem from './item/TodoItem';
import CreateTodoField from './create-todo-field/CreateTodoField';
import AddSubtaskModal from './components/AddSubtaskModal';
import { useTodos } from '@/hooks/useTodos';

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
  const {
    todos,
    setTodos,
    newSubtaskData,
    setNewSubtaskData,
    changeTodo,
    removeTodo,
    handleAddSubtask,
    handleSubmitSubtask
  } = useTodos(data);

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
        <AddSubtaskModal
          subtaskData={newSubtaskData}
          onSubmit={handleSubmitSubtask}
          onCancel={() => setNewSubtaskData({
            parentId: null,
            title: '',
            isFormVisible: false
          })}
          onChange={(e) => setNewSubtaskData({
            ...newSubtaskData,
            title: e.target.value
          })}
        />
      )}
    </div>
  );
};

export default Home;
