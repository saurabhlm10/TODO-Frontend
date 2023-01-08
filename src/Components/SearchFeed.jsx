import {useEffect} from 'react'
import { useParams } from 'react-router'
import Todos from './Todos'
import axios from 'axios'

const SearchFeed = ({todos, setTodos, searchTodos, setSearchTodos }) => {
    const {searchTerm} = useParams()

    const searchTodo = async () =>{
      setSearchTodos(true)

      console.log(searchTodos);

        const newSearchTerm = searchTerm.slice(1)
        console.log(newSearchTerm);

        const resp = await axios.get(`/api/search/${newSearchTerm}`)
    
        setTodos(resp.data.searchResults)
        // console.log(todos)
      }

      useEffect(() => {
        searchTodo()
      }, [searchTerm])
      

  return (
    <div>
      {todos.length > 0 && <Todos todos={todos} setTodos={setTodos}  searchTodos={searchTodos} setSearchTodos={setSearchTodos}/>}
    </div>
  )
}

export default SearchFeed
