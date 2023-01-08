import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import Modal from './Modal'

const Todo = () => {
    const { todoId } = useParams()
    const [todo, setTodo] = useState({})

    const [tempText, setTempText] = useState('')

    const [isTitleInEditMode, setIsTitleInEditMode] = useState(false)
    const [isTaskInEditMode, setIsTaskInEditMode] = useState(null)
    const [showAddATaskInput, setShowAddATaskInput] = useState(false)
    const [addATaskInputValue, setAddATaskInputValue] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const newtodoId = todoId.slice(1)

    const fetchTodo = async () => {
        const newtodoId = todoId.slice(1)

        const resp = await axios.get(`/api/gettodo/${newtodoId}`)

        const data = resp.data.todo

        setTodo(data)
    }

    useEffect(() => {
        fetchTodo()
    }, [])

    const checkOffTask = (id) => {
        const newtodoId = todoId.slice(1)


        const tempTasks = todo.tasks.filter((task, i) => i !== id)

        const tempTodo = {
            title: todo.title,
            tasks: [...tempTasks]
        }

        setTodo(tempTodo)

        const resp = axios.put(`/api/edittodo/${newtodoId}`, tempTodo)

        console.log(resp)

    }

    const confirmChange = async () => {
        const newtodoId = todoId.slice(1)
        const tempTodo = {
            ...todo,
            title: tempText,
        }
        setTodo(tempTodo)

        const resp = await axios.put(`/api/edittodo/${newtodoId}`, tempTodo)

        console.log(resp)

        setIsTitleInEditMode(false)
    }

    const confirmTaskChange = async (id) => {
        const newtodoId = todoId.slice(1)

        const tempTasks = [...todo.tasks]

        tempTasks[id] = tempText

        console.log(tempTasks);

        const tempTodo = {
            ...todo,
            tasks: [...tempTasks],
        }

        setTodo(tempTodo)

        const resp = await axios.put(`/api/edittodo/${newtodoId}`, tempTodo)

        console.log(resp)
        setIsTaskInEditMode(null)
    }

    const addATask = async () => {
        const newtodoId = todoId.slice(1)

        const tempTasks = [...todo.tasks]

        tempTasks.push(addATaskInputValue)

        const tempTodo = {
            ...todo,
            tasks: [...tempTasks],
        }

        setTodo(tempTodo)

        const resp = await axios.put(`/api/edittodo/${newtodoId}`, tempTodo)

        setAddATaskInputValue('')
        setShowAddATaskInput(false)
    }

 
    return (

        <div>
            {isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} newtodoId={newtodoId}/>}
            <div className='todo-header'>
                {isTitleInEditMode ? (
                    <div className='edit-input-field'>
                        <input
                            autoFocus
                            type='text'
                            value={tempText}
                            onChange={(e) => setTempText(e.target.value)}
                        />
                        <button
                            className='confirm-edit'
                            onClick={() => {
                                confirmChange()
                                // setTempText(todo.title)
                            }}
                        >confirm</button>
                        <button
                            className='cancel-edit'
                            onClick={() => setIsTitleInEditMode(false)}>cancel</button>
                    </div>
                ) : (
                    <>
                        <p
                            style={{ outline: 'none', width: '100%' }}
                            onClick={() => {
                                setIsTitleInEditMode(true)
                                setTempText(`${todo?.title}`)
                            }
                            }
                        >
                            {todo.title}
                        </p>
                        <p
                        onClick={() => setIsModalOpen(true)}
                        >✓</p>
                    </>

                )
                }

            </div>
            {
                todo?.tasks?.map((task, id) => (
                    <div className='task' key={id}>
                        {isTaskInEditMode === id ? (
                            <>
                                <div className='edit-task'>
                                    <input
                                        autoFocus
                                        type='text'
                                        value={tempText}
                                        onChange={(e) => setTempText(e.target.value)}
                                    />
                                    <button
                                        className='confirm-edit'
                                        onClick={() => {
                                            confirmTaskChange(id)
                                        }}
                                    >confirm</button>
                                    <button
                                        className='cancel-edit'
                                        onClick={() => setIsTaskInEditMode(null)}>cancel</button>
                                </div>
                            </>
                        ) : (

                            <>
                                <p
                                    onClick={() => {
                                        setIsTaskInEditMode(id)
                                        setTempText(`${task}`)
                                    }
                                    }
                                >{task}</p>
                                <p className='check-button'
                                    onClick={() => checkOffTask(id)}
                                >✓</p>
                            </>
                        )
                        }

                    </div>

                ))
            }
            {showAddATaskInput ? (
                <div className='add-a-task'>

                    <input
                        autoFocus
                        className='create-todo-task-input'
                        type="text"
                        placeholder='Add Task'
                        value={addATaskInputValue}
                        onChange={(e) => {
                            setAddATaskInputValue(e.target.value)
                        }}
                    />
                    <button
                        className='confirm-add-task'
                        onClick={() => addATask()}

                    >Add Task</button>
                    <button
                        className='cancel-add-task'
                        onClick={() => setShowAddATaskInput(false)}

                    >Cancel</button>
                </div>
            ) : (
                <button
                    onClick={() => setShowAddATaskInput(true)}
                    className='add-a-task-button'
                >Add A Task</button>
            )

            }

        </div >
    )
}

export default Todo
