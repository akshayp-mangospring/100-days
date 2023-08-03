import { createBrowserRouter } from 'react-router-dom';

import Authenticate from './pages/Authenticate';
import Todos from './pages/Todos';
import Blog from './pages/Blog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authenticate />,
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
