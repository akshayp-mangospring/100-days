import TodoListItem from './TodoListItem';

function TodoList({ todos, setTodos, toastData, setShowToast, setToastData }) {
  return (
    <>
      {
        todos.length ? (
          <ul className="list-unstyled row">
            {todos.map(({ content, done, id }) => (
              <TodoListItem
                key={id}
                content={content}
                done={done}
                id={id}
                todos={todos}
                setTodos={setTodos}
                toastData={toastData}
                setToastData={setToastData}
                setShowToast={setShowToast}
              />
            ))}
          </ul>
        ) : <>
          <h3 className="text-center">Seems pretty empty here...</h3>
          <h3 className="text-center">Add some Todos to get some work done</h3>
        </>
      }
    </>
  );
}

export default TodoList;
