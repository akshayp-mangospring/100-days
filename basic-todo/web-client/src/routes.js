import { createBrowserRouter, Outlet } from 'react-router-dom';

import Authenticate from './pages/Authenticate';
import Header from './components/Header';
import Todos from './pages/Todos';
import Blogs from './pages/Blogs';
import Article from './pages/Article';
import EditArticle from './pages/EditArticle';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import EditVideo from './pages/EditVideo';
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
  {
    path: '/videos',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [{
      path: '',
      element: <Videos />,
    },
    {
      path: ':videoId',
      element: <VideoDetail />
    },
    {
      path: 'new',
      element: <EditVideo />
    },
    {
      path: ':videoId/edit',
      element: <EditVideo />
    }]
  },
]);

export default router;
