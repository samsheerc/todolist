import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddTodo = () => {
    if (toDo.trim() !== '') {
      if (editingId !== null) {
        // Editing existing todo
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === editingId ? { ...todo, text: toDo } : todo
          )
        );
        setEditingId(null);
      } else {
        // Adding new todo
        setTodos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      }

      setToDo('');
    }
  };

  const handleEditTodo = (id) => {
    const todoToEdit = toDos.find(todo => todo.id === id);
    if (todoToEdit) {
      setToDo(todoToEdit.text);
      setEditingId(id);
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    setEditingId(null);
  };

 

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={handleAddTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) => {
                  setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                      todo.id === obj.id
                        ? { ...todo, status: e.target.checked }
                        : todo
                    )
                  );
                }}
                value={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i
                onClick={() => handleEditTodo(obj.id)}
                className="fas fa-edit"
              ></i>
              <i
                onClick={() => handleDeleteTodo(obj.id)}
                className="fas fa-times"
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
