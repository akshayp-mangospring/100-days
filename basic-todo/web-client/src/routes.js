import { createBrowserRouter, Outlet } from 'react-router-dom';

import Authenticate from './pages/Authenticate';
import Header from './components/Header';
import Todos from './pages/Todos';
import Blogs from './pages/Blogs';
import Article from './pages/Article';
import EditArticle from './pages/EditArticle';
import EditProfile from './pages/EditProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authenticate />,
  },
  {
    path: '/profile',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [{
      path: '',
      element: <EditProfile />,
    }]
  },
  {
    path: '/todos',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [{
      path: '',
      element: <Todos />,
    }]
  },
  {
    path: '/articles',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [{
      path: '',
      element: <Blogs />,
    },
    {
      path: ':articleId',
      element: <Article />
    },
    {
      path: 'new',
      element: <EditArticle />
    },
    {
      path: ':articleId/edit',
      element: <EditArticle />
    }]
  },
]);

export default router;
