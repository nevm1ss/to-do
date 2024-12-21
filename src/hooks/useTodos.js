import { useState } from 'react';

export const useTodos = (initialData) => {
  const [todos, setTodos] = useState(initialData);
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

  return {
    todos,
    setTodos,
    newSubtaskData,
    setNewSubtaskData,
    changeTodo,
    removeTodo,
    handleAddSubtask,
    handleSubmitSubtask
  };
}; 