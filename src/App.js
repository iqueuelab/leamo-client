import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CourseManagement from './containers/CourseManagement';
import Dashboard from './containers/Dashboard';
import Layout from './containers/Layout';
import Login from './containers/Login';
import MultiTenancy from './containers/MultiTenancy';
import RegisterUser from './containers/RegisterUser';
import Users from './containers/Users';

import './App.css';


const App = () => {
  const currentUser = useSelector(state => state.login.loggedInUser);

  const routes = [
    {
      pathname: '/',
      component: <Dashboard />
    },
    {
      pathname: '/:token',
      component: <Dashboard />
    },
    {
      pathname: '/dashboard',
      component: <Dashboard />
    },
  ];
  if(currentUser?.role === 'SuperAdmin') {
    routes.push({
      pathname: '/multi-tenancy',
      component: <MultiTenancy />
    },
    {
      pathname: '/users',
      component: <Users />
    },
    {
      pathname: '/courses',
      component: <CourseManagement />
    });
  }
  if(currentUser?.role === 'Admin') {
    routes.push({
      pathname: '/users',
      component: <Users />
    },
    {
      pathname: '/courses',
      component: <CourseManagement />
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route key='/login' path='/login' element={<Login />}></Route>
        <Route key='/register' path='/register/:role/:orgId/:userId' element={<RegisterUser />}></Route>
        {
          routes.map((route) =>
            <Route key={route.pathname} path={route.pathname} element={<Layout>{route.component}</Layout>} />
          )
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
