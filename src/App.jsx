import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
// import { FaEdit } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let savedTodos = JSON.parse(todostring);
      setTodos(savedTodos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("");
    saveToLS();
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => { return item.id === id });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }
  const handleEdit = (e) => {
    let id = e.target.name;
    let t = todos.filter(item => { return item.id === id });
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => { return item.id !== id });
    setTodos(newTodos);
    saveToLS();
  }
  const handleDelete = (e) => {
    let a = confirm("Are you sure to delete this todo ?");
    if (a === true) {
      let id = e.target.name;
      let newTodos = todos.filter(item => { return item.id !== id });
      setTodos(newTodos);
      saveToLS();
    }
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);

  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto bg-violet-300 my-3 rounded-lg p-3 min-h-[80vh] w-full md:w-1/2 '>
        <h1 className='font-bold text-2xl text-center'>iTask - Manage your Todos at one place</h1>
        <div className='my-5 flex flex-col gap-1'>
          <h2 className='font-bold text-lg '>Add A Todo</h2>
          <div className='flex gap-3'>
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-2 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-slate-600 disabled:bg-slate-500 hover:bg-slate-800 p-2 py-1 text-sm font-bold text-white rounded-md'>Save</button>
          </div>
        </div>

        <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='my-4 hover:cursor-pointer' id='show' />
        <label htmlFor="show" className='mx-2 hover:cursor-pointer'>Finished Todos</label>

        <h1 className='text-2xl font-bold'>Your Todos</h1>
        <div className="todos">
          {todos.lenght === 0 && <div className='m-5'>No Todos To Display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className='flex justify-between my-3 w-1/2'>
              <div className='flex gap-3'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} className='hover:cursor-pointer' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex gap-2">
                <button onClick={handleEdit} name={item.id} className='bg-slate-600 hover:bg-slate-800 p-2 py-1 text-sm font-bold text-white rounded-md'>Edit</button>
                <button name={item.id} onClick={handleDelete} className='bg-slate-600 hover:bg-slate-800 p-2 py-1 text-sm font-bold text-white rounded-md'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
