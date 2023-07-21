import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Todos from './pages/Todos';
import Blog from './pages/Blog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/todos',
    element: <Todos />,
  },
  {
    path: '/blogs',
    element: <Blog />,
  },
]);

export default router;
