import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { login } from '../redux/actions/login';

import { cleanErrors } from '../redux/actions/loading';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.login.loggedInUser);
  const loading = useSelector((state) => state.loader.loading);
  const error = useSelector((state) => state.loader.error);

  const validateForm = (event) => {
    event.preventDefault();
    let errorsToSet = []
    if(!username) errorsToSet.push('Please enter username!');
    if(!password ) errorsToSet.push('Please enter password!');
    
    setErrors(errorsToSet)
    
    if(errorsToSet.length === 0) {
      proceedLogin();
    }
  }

  const proceedLogin = () => {
    dispatch(login({username, password}));
  }

  useEffect(() => {
    if(error) setErrors(...error);
    else setErrors([]);
  }, [error])
  
  useEffect(() => {
    if(loggedInUser) {
      if(loggedInUser.role !== 'SuperAdmin' && loggedInUser?.subdomain) {
        const currWindow = window.location;
        if (!currWindow.hostname.includes(loggedInUser.subdomain)) {
          window.location.replace(`${currWindow.protocol}//${loggedInUser.subdomain}.${currWindow.host}/?token=${loggedInUser.token}`);
        } 
        else if (currWindow.hostname.includes(loggedInUser.subdomain) && (currWindow.pathname === '/' || currWindow.pathname === '/login')) {
          navigate(`/dashboard`);
          localStorage.setItem('token', loggedInUser.token);
        }
      }
      if(loggedInUser.role === 'SuperAdmin' && !localStorage.getItem('token')) {
        navigate('/dashboard');
        localStorage.setItem('token', loggedInUser.token)
      }
    } 
    if(!loading && !loggedInUser) {
      navigate('/login');
      localStorage.removeItem('token');
      dispatch(cleanErrors());
    }
  }, [loggedInUser, loading, navigate, dispatch])

  return (
    <div className='login-container'>
      <div className='login-form'>
        <img alt="leamo-logo" src="/leamo.png"/>
        <h2>Login</h2>
        <form onSubmit={validateForm}>
        <div className='form-field'>
          Username
          <input 
            type='text' 
            name='username' 
            value={username}
            onChange={(event) => setUsername(event.target.value)} 
          />
        </div>
        <div className='form-field'>
          Password
          <input 
            type='password' 
            name='password' 
            value={password}
            onChange={(event) => setPassword(event.target.value)}  
          />
        </div>
        <div className='error'>
          {Object.keys(errors).map(error => (
            <p key={error}>
              {errors[error]}
            </p>
          ))}
        </div>
        <div className='form-field'>
          <input 
            type='submit' 
            value="LOGIN"
          />
        </div>
        </form>
      </div>
    </div>
  )
}

export default Login;