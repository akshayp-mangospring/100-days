import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [testApi, setTestApi] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/test')
      .then(r => r.json())
      .then(({message}) => {
        setTestApi(message);
      });
  }, []);

  return (
    <div className="App">
      <h1>{testApi}</h1>
    </div>
  );
}

export default App;
