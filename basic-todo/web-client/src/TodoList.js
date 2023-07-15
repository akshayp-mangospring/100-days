function TodoList({ todos }) {
  return (
    <>
      {
        todos.length ? (
          <ul>
            {todos.map(({ content, id }) => <li key={id}>{content}</li>)}
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
