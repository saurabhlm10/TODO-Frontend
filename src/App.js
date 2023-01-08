import { useState } from "react";
import "./App.css";
import Todos from "./Components/Todos";
import Todo from "./Components/Todo";
import CreateTodo from "./Components/CreateTodo";
import {  Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SearchFeed from "./Components/SearchFeed";

function App() {
  const location = useLocation();
  const [todos, setTodos] = useState([])
  const [searchTodos, setSearchTodos] = useState(false)

  
  


  return (
    <>
      {location.pathname === "/createtodo" ? (
        <Routes>
          <Route path="/createTodo" element={<CreateTodo />} />
        </Routes>
      ) : (
        <div id="container">
          <Navbar searchTodos={searchTodos} setSearchTodos={setSearchTodos}/>
          <Routes>
            <Route exact path="/" element={<Todos todos={todos} setTodos={setTodos} searchTodos={searchTodos} setSearchTodos={setSearchTodos}/>} />
            <Route path="/:todoId" element={<Todo />} />
            <Route exact path="/search/:searchTerm" element={<SearchFeed todos={todos} setTodos={setTodos} searchTodos={searchTodos} setSearchTodos={setSearchTodos}/>} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
