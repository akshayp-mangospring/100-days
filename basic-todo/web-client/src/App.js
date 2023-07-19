import { useEffect, useState } from 'react';
import { TODOS_API } from './constants';
import TodoList from './components/TodoList';
import Toast from './components/Toast';
import Timer from './components/Timer';

function App() {
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState([]);
  const [toastData, setToastData] = useState({
    message: '',
    status: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [requestProcessing, setRequestProcessing] = useState(false);

  useEffect(() => {
    fetch(TODOS_API)
      .then(r => r.json())
      .then(({ todos: res }) => {
        setTodos(res);
      });
  }, []);

  useEffect(() => {
    const hideToastTimeout = setTimeout(() => {
      if (showToast) {
        setShowToast(false);
      }
    }, 3000);

    return () => clearTimeout(hideToastTimeout);
  }, [showToast]);

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 13) addTodo();
  };

  const addTodo = () => {
    setRequestProcessing(true);
    fetch(TODOS_API, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    }).then(r => r.json())
      .then(({ status, todo, message, error }) => {
        setRequestProcessing(false);

        if (status === 'ok') {
          setContent('');
          setTodos([todo, ...todos]);
          setToastData({
            message: message,
            status: 'Success',
          });
          setShowToast(true);
        } else {
          setToastData({
            message: error,
            status: 'Error',
          });
          setShowToast(true);
        }
      });
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center my-3">My Todos</h1>
        <div className="input-group input-group-lg mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Add Todo here"
            value={content}
            onKeyDown={handleKeyDown}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className={`btn btn-primary ${(requestProcessing || !content.length) && 'disabled'}`} type="button" onClick={addTodo}>Add</button>
        </div>
        <TodoList todos={todos} setTodos={setTodos} toastData={toastData} setShowToast={setShowToast} setToastData={setToastData} />
      </div>
      {showToast && <Toast toastData={toastData} setShowToast={setShowToast} />}
      <Timer timeInSec={1500} />
    </>
  );
}

export default App;
