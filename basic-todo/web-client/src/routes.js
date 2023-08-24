import { createBrowserRouter } from 'react-router-dom';

import Authenticate from './pages/Authenticate';
import Header from './components/Header';
import Todos from './pages/Todos';
import Blogs from './pages/Blogs';
import Article from './pages/Article';

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
      <Blogs />
    </>
  },
  {
    path: '/blogs/:articleId',
    element: <>
      <Header />
      <Article />
    </>
  },
]);

export default router;
