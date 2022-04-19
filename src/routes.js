import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LandingPage from './components/_dashboard/hive/LandingPage';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import HiveMainPage from './layouts/HiveMainPage';
import HiveDashboard from './layouts/HiveDashboard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/hive',
      element: <HiveMainPage />,
      children: [{ path: 'landing', element: <LandingPage /> }]
    },

    {
      path: '/hive/dashboard',
      element: <HiveDashboard />,
      children: [{ path: 'my', element: undefined }]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
