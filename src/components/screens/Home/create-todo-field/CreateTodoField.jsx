import React, { useState } from 'react'
import { BsCalendar, BsBell, BsArrowRepeat } from 'react-icons/bs'
import GradientButton from '@/components/ui/GradientButton'

const CreateTodoField = ({setTodos}) => {
  const [title, setTitle] = useState('')
  const MAX_LENGTH = 200; // Максимальная длина заметки

  const addTodo = (title) => {
    if (!title.trim()) return;
    
    setTodos(prev => [
      {
        _id: Date.now().toString(),
        title,
        isCompleted: false
      },
      ...prev,
    ])
    setTitle('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo(title);
    }
  }

  return (
    <div className='flex flex-col mb-16 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl w-full transition-all duration-300 hover:shadow-2xl hover:border-gray-600/50'>
      <div className='h-16 px-6 flex items-center'>
        <input 
          type="text" 
          onChange={e => setTitle(e.target.value.slice(0, MAX_LENGTH))} // Ограничиваем ввод
          value={title}
          onKeyPress={handleKeyPress}
          maxLength={MAX_LENGTH} // HTML ограничение
          className='bg-transparent w-full border-none outline-none text-lg placeholder-gray-500'
          placeholder='Добавить новую задачу...'
        />
      </div>
      
      <div className='h-[1px] bg-gray-700/50'></div>
      
      <div className='h-16 px-6 flex justify-between items-center'>
        <div className="flex gap-4">
          <button className="group">
            <BsCalendar className="text-gray-400 group-hover:text-white transition-colors duration-200" size={20} />
          </button>
          <button className="group">
            <BsBell className="text-gray-400 group-hover:text-white transition-colors duration-200" size={20} />
          </button>
          <button className="group">
            <BsArrowRepeat className="text-gray-400 group-hover:text-white transition-colors duration-200" size={20} />
          </button>
        </div>
        <GradientButton onClick={() => addTodo(title)}>
          Добавить
        </GradientButton>
      </div>
    </div>
  )
}

export default CreateTodoField