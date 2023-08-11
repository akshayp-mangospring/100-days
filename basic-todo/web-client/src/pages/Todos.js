import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { ENTER_KEY_CODE, TODOS_API } from '../constants';

import TodoList from '../components/TodoList';
import Toast from '../components/Toast';
import Timer from '../components/Timer';

function Todos() {
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [todos, setTodos] = useState([]);
  const [toastData, setToastData] = useState({
    message: '',
    status: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [requestProcessing, setRequestProcessing] = useState(false);

  useEffect(() => {
    fetch(TODOS_API, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
    })
      .then(r => r.json())
      .then(({ status, todos: res }) => {
        if (status === 'ok') {
          setTodos(res);
        } else {
          navigate('/');
        }
      }).catch((e) => {
        navigate('/');
      });
  }, [navigate]);

  useEffect(() => {
    const hideToastTimeout = setTimeout(() => {
      if (showToast) {
        setShowToast(false);
      }
    }, 3000);

    return () => clearTimeout(hideToastTimeout);
  }, [showToast]);

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === ENTER_KEY_CODE) addTodo();
  };

  const logMeOut = () => {
    localStorage.removeItem('auth_token');
    navigate('/');
  }

  const addTodo = () => {
    setRequestProcessing(true);
    fetch(TODOS_API, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
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
        <button className="btn btn-primary position-fixed top-0 end-0" type="button" onClick={logMeOut}>Log Out</button>
      </div>
      {showToast && <Toast toastData={toastData} setShowToast={setShowToast} />}
      {/* <Timer timeInSec={1500} /> */}
    </>
  );
}

export default Todos;
