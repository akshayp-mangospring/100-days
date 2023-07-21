import { createBrowserRouter } from 'react-router-dom';

import Login from './Login';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/todos',
    element: <App />,
  },
]);

export default router;
