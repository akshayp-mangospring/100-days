import TodoListItem from './TodoListItem';

function TodoList({ todos }) {
  return (
    <>
      {
        todos.length ? (
          <ul className="list-unstyled row">
            {todos.map(({ content, id }) => (
              <TodoListItem key={id} content={content} id={id} />
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
