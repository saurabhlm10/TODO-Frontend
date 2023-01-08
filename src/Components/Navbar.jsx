import React from 'react'
import { useNavigate } from 'react-router'
import SearchBar from './SearchBar'

const Navbar = ({ searchTodos, setSearchTodos}) => {
  const navigate = useNavigate()

  return (
    <div id='navbar'>
      <button id='create-todo-button'
      onClick={() => navigate('/createtodo')}
      >Create a Todo</button>
      <SearchBar  searchTodos={searchTodos} setSearchTodos={setSearchTodos}/>
    </div>
  )
}

export default Navbar
