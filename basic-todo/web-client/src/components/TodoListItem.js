import { useEffect, useRef, useState } from 'react';
import Pen from './icons/Pen';
import Trash from './icons/Trash';
import Tick from './icons/Tick';
import Close from './icons/Close';
import { DEAD_LINK, TODOS_API } from '../constants';

function TodoListItem({ content, id, todos, setTodos, toastData, setShowToast, setToastData }) {
  const inputRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValue, setEditValue] = useState(content);

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 13) editTodo();
  };

  const editTodo = () => {
    fetch(TODOS_API, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        content: editValue,
      }),
    }).then(r => r.json())
      .then(({ status, todo: {
        content, id
      } }) => {
        if (status === 'ok') {
          setTodos(todos.map((t) => {
            if (t.id !== id) return t;
            return {
              ...t,
              content
            }
          }));
          setIsEditMode(false);
        } else {

        }
      });
  };

  const deleteTodo = () => {
    fetch(TODOS_API, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }).then(r => r.json())
      .then(() => {
        setTodos(todos.filter(({ id: tId }) => tId !== id));
      });
  };

  return (
    <li className="col-sm-6">
      <div className="d-flex align-items-center border border-light-subtle rounded p-2 mb-1">
        {
          isEditMode ?
            (
              <>
                <input
                  type="text"
                  ref={inputRef}
                  className="w-100 form-control me-auto"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <a href={DEAD_LINK} onClick={editTodo} className="d-flex align-items-center text-success ms-3">
                  <Tick />
                </a>
                <a href={DEAD_LINK} onClick={() => setIsEditMode(false)} className="d-flex align-items-center text-danger ms-3">
                  <Close />
                </a>
              </>
            ) : (
              <>
                <span className="me-auto">{content}</span>
                <a href={DEAD_LINK} onClick={() => setIsEditMode(true)} className="d-flex align-items-center text-primary">
                  <Pen />
                </a>
                <a href={DEAD_LINK} onClick={deleteTodo} className="d-flex align-items-center text-danger ms-3">
                  <Trash />
                </a>
              </>
            )
        }
      </div>
    </li>
  );
}

export default TodoListItem;
