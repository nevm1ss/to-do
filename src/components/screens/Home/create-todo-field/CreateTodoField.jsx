import React, { useState } from 'react'

const CreateTodoField = ({setTodos}) => {
  const [title, setTitle] = useState('')

  const addTodo = title => {
		setTodos(prev => [
		{
			_id: new Date(),
			title,
			isCompleted: false
		},
		...prev,
		])
    setTitle('')
	}

  return (
    <div className='flex items-center justify-between mb-16 rounded-2xl border-2 border-gray-800 px-5 py-2 w-full'>
      <input 
        type="text" 
        onChange={e => setTitle(e.target.value)}
        value={title}
        onKeyPress={e => e.key === 'Enter' && addTodo(title)}
        className='bg-transparent w-full border-none outline-none'
        placeholder='Add a task'
      />
    </div>
  )
}

export default CreateTodoField