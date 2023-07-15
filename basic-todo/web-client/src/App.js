import { useEffect, useState } from 'react';
import TodoList from './TodoList';

function App() {
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then(r => r.json())
      .then(({ todos: res }) => {
        setTodos(res);
      });
  }, []);

  const addTodo = () => {
    fetch('http://localhost:3000/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    }).then(r => r.json())
      .then((res) => {
        setContent('');
        setTodos([res, ...todos]);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">Todos</h1>
      <div className="input-group input-group-lg mb-5">
        <input type="text" className="form-control" placeholder="Add Todo here" value={content} onChange={(e) => setContent(e.target.value)} />
        <button className="btn btn-primary" type="button" onClick={addTodo}>Add</button>
      </div>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
