import { createBrowserRouter } from 'react-router-dom';

import Authenticate from './pages/Authenticate';
import Header from './components/Header';
import Todos from './pages/Todos';
import Blog from './pages/Blog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authenticate />,
  },
  {
    path: '/todos',
    element: <>
      <Header />
      <Todos />
    </>,
  },
  {
    path: '/blogs',
    element: <>
      <Header />
      <Blog />
    </>,
  },
]);

export default router;
