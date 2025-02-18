
import './components/todo/todo.css'
import TodoData from './components/todo/ToDoDaTa'
import TodoNew from './components/todo/TodoNew'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {
  const [todoList, setTodoList] = useState([])

  const addNewToDo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }
    setTodoList([...todoList, newTodo])
  }

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  return (
    <div className="todo-container">
      <div className="todo-title">Todo list</div>
      <TodoNew
        addNewToDo={addNewToDo}
      />

      {todoList.length > 0 ?
        <TodoData
          todoList={todoList}
        />
        :
        <div className="todo-image">
          <img src={reactLogo} className='logo' alt="" />
        </div>
      }



    </div>

  )
}


export default App
