import Pen from './icons/Pen';
import Trash from './icons/Trash';
import { DEAD_LINK, TODOS_API } from '../constants';

function TodoListItem({ content, id, }) {
  const editTodo = () => {
    fetch(TODOS_API, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        content,
      }),
    }).then(r => r.json())
      .then((res) => {
        console.log(res);
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
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <li className="col-sm-6">
      <div className="d-flex align-items-center border border-light-subtle rounded p-2 mb-1">
        <span className="me-auto">{content}</span>
        <a href={DEAD_LINK} onClick={editTodo} className="d-flex align-items-center text-primary">
          <Pen />
        </a>
        <a href={DEAD_LINK} onClick={deleteTodo} className="d-flex align-items-center text-danger ms-3">
          <Trash />
        </a>
      </div>
    </li>
  );
}

export default TodoListItem;
