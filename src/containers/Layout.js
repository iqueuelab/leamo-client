import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import { cleanErrors } from '../redux/actions/loading';
import { getProfile } from '../redux/actions/user';

import './layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.loader.loading || state.login.loading);
  const loggedInUser = useSelector(state => state.login.loggedInUser);

  const token = localStorage.getItem('token') || queryString.parse(location.search).token;
  
  useEffect(() => {
    if(token && !loading && !loggedInUser) {
      localStorage.setItem('token', token);
      dispatch(getProfile(token));
    }
  },[dispatch]);

  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if(loggedInUser && !loading) {
      const currWindow = window.location;
      if(loggedInUser.role !== 'SuperAdmin' && loggedInUser?.subdomain) {
        if(!currWindow.hostname.includes(loggedInUser.subdomain)) {
          window.location.replace(`${currWindow.protocol}//${loggedInUser.subdomain}.${currWindow.host}/?token=${loggedInUser.token}`);
        }
        else if (currWindow.hostname.includes(loggedInUser.subdomain) && (currWindow.pathname === '/' || currWindow.pathname === '/login')) {
          navigate(`/dashboard`);
          localStorage.setItem('token', loggedInUser.token)
        }
      } 
      if(loggedInUser.role === 'SuperAdmin' && currWindow.pathname === '/') {
        navigate('/dashboard');
        localStorage.setItem('token', loggedInUser.token)
      }
    }
    if(!loading && !loggedInUser) {
      navigate('/login');
      localStorage.removeItem('token');
      dispatch(cleanErrors());
    }
  }, [loggedInUser, navigate, loading]);

  return (
    <div className='main-container'>
      {loading && (<div className='loader'><h3>Loading...</h3></div>)}
      <Header />
      <div className='content'>
        <Sidebar loggedInUser={loggedInUser}/>
        {children}
      </div>
    </div>
  )
}

export default Layout;