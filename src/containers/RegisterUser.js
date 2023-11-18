import axios from 'axios';
import debounce from "lodash/debounce";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import './register-user.css';

const RegisterUser = () => {
  const [formData, setFormData] = useState({});
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const ref = useRef();
  const params= useParams();
  const navigate = useNavigate();

  const validateForm = (event) => {
    event.preventDefault();
    const errors = {}
    if (!username) {
      errors.username = 'Please choose a username.'
    }
    if (!formData.country) {
      errors.country = 'Please enter your country name.'
    }
    if (!formData.state) {
      errors.state = 'Please enter your state name.'
    }
    if (!formData.address) {
      errors.address = 'Please enter your address.'
    }
    if (!formData.birthDate) {
      errors.birthDate = 'Please enter your Birth Date.'
    }
    if (!formData.password) {
      errors.password = 'Please choose a password.'
    } else if (formData.password && formData.password !== formData.confirmPassword) {
      errors.password = 'Password and Confirm Password are mismatched!!!'
    }
    setErrors(errors)
    if (errors.length) {
      return ;
    } else {
      setUser();
    }
  }

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  const debouncedCallback = useMemo(() => {
    console.log("usernmae", username);
    return debounce(async() => {
    console.log("usernmae", username);
      await axios.get(`${process.env.REACT_APP_API_URL}/user/validateUsername/${username}`)
      .then(res => {
        console.log(res);
      }).catch(e => console.log(e));
    }, 1000);
  }, [username]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    debouncedCallback();
  }

  const setUser = async() => {
    await axios.put(`${process.env.REACT_APP_API_URL}/user/${params.userId}`, formData)
      .then(res => navigate('/login'))
      .catch(e => console.log(e));
  }

  useEffect(() => {
    return async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}/user/${params.userId}`)
        .then(res => setFormData(res.data))
        .catch(e => console.log(e));
    }
  }, [params]);

  return (
    <div className='registration-container'>
      <div className='registration-form'>
        <img alt="leamo-logo" src="/leamo.png"/>
        <h2>Registration Form</h2>
        <form onSubmit={validateForm}>
          <div className='column-2'>
            <div className='form-field'>
              First Name
              <input 
                type='text' 
                value={formData.firstname}
                disabled
              />
            </div>
            <div className='form-field'>
              Last Name
              <input 
                type='text' 
                value={formData.lastname}
                disabled
              />
            </div>
          </div>
          <div className='column-2'>
            <div className='form-field'>
              Email
              <input 
                type='text' 
                value={formData.email}
                disabled
              />
            </div>
            <div className='form-field'>
              Phone
              <input 
                type='text' 
                value={formData.phone}
                disabled
              />
            </div>
          </div>
          <div className='column-2'>
            <div className='form-field'>
              Department
              <input 
                type='text' 
                value={formData.department}
                disabled
              />
            </div>
            <div className='form-field'>
              Manager
              <input 
                type='text' 
                value={formData.manager}
                disabled
              />
            </div>
          </div>
          <div className='column-2'>
            <div className='form-field error-field'>
              Country
              <input 
                type='text' 
                name='country' 
                value={formData.country}
                onChange={handleChange}  
              />
              <div className='error'>
                {errors.country}
              </div>
            </div>
            <div className='form-field error-field'>
              State
              <input 
                type='text' 
                name='state' 
                value={formData.state}
                onChange={handleChange}  
              />
              <div className='error'>
                {errors.state}
              </div>
            </div>
          </div>
          <div className='form-field error-field'>
            Address
            <input 
              type='text' 
              name='address' 
              value={formData.address}
              onChange={handleChange} 
            />
            <div className='error'>
              {errors.address}
            </div>
          </div>

          <div className='column-2'>
            <div className='form-field error-field'>
              Choose Username
              <input 
                type='text' 
                name='username' 
                value={username}
                onChange={handleUsernameChange} 
              />
              <div className='error'>
                {errors.username}
              </div>
            </div>
            <div className='form-field error-field'>
              Birth Date
              <input 
                type='date' 
                name='birthDate' 
                value={formData.birthDate}
                onChange={handleChange} 
              />
              <div className='error'>
                {errors.birthDate}
              </div>
            </div>
          </div>
          <div className='error-field'>
            <div className='column-2'>
              <div className='form-field'>
                Set Password
                <input 
                  type='password' 
                  name='password' 
                  value={formData.password}
                  onChange={handleChange}  
                />
              </div>
              <div className='form-field'>
                Confirm Password
                <input 
                  type='password' 
                  name='confirmPassword' 
                  value={formData.confirmPassword}
                  onChange={handleChange}  
                />
              </div>
              <i className="password-help material-icons">&#xe8fd;</i>
            </div>
            <div className='error'>
              {errors.password}
            </div>
          </div>
          <div className='error'>
            
          </div>
          <div className='form-field'>
            <input 
              type='submit' 
              value="REGISTER"
            />
          </div>
        </form>
      </div>
      <Tooltip anchorSelect=".password-help" place="left" style={{ backgroundColor: 'var(--primary-text-color)', color: 'var(--sidebar-background-color)'}}>
        <>
          A minimum 8 characters password <br/>contains a combination of 
          <strong> uppercase <br/> and lowercase letter, special <br/> character</strong> and <strong>number</strong>.
        </>
      </Tooltip>
    </div>
  )
}

export default RegisterUser;

// {Object.keys(errors).map(error => (
//               <p key={error}>
//                 {/* {errors[error]} */}
//               </p>
//             ))}