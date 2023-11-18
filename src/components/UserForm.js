import React, { useEffect, useState } from 'react';
import { validateEmail } from '../utils/formValidators';

const UserForm = ({ formData = {},orgList = [],currentUserRole, closeModal, handleFormDataChange, onSubmit, error }) => {
  const [valid, setValidForm] = useState(false);

  const handleChange = (event) => {
    handleFormDataChange({ ...formData, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    isFormValid(formData);
  }, [formData]);

  const isFormValid = () => {
    if(!formData.role || !formData.firstname || !formData.lastname 
      || !formData.department || !formData.manager || !formData.email || !formData.phone || !validateEmail(formData.email)) {
        setValidForm(false);
    } else {
      setValidForm(true);
    }
  }

  return (
    <div className='form'>
      <div className='column-2'>
        <div className='form-field'>
          User Role
          <select type='text' name='role' onChange={handleChange} value={formData?.role} defaultValue='default'>
            <option value="default" disabled>Select a role for new user</option>
            {currentUserRole ==='SuperAdmin' && <option value='Admin'>Admin</option>}
            <option value='Manager'>Manager</option>
            <option value='User'>User</option>
            <option value='Instructor'>Instructor</option>
          </select>
        </div>
        {currentUserRole ==='SuperAdmin' && (
          <div className='form-field'>
            Organisation
            <select type='text' name='orgId' onChange={handleChange} value={formData?.orgId} defaultValue='default'>
              <option value="default" disabled>Select a Organisation new user</option>
              {orgList.map((org) => <option value={org?._id}>{org.name}</option>)} 
            </select>
          </div>
        )}
      </div>
      <div className='column-2'>
        <div className='form-field'>
          First Name
          <input type='text' name='firstname' onChange={handleChange} value={formData?.firstname} />
        </div>
        <div className='form-field'>
          Last Name
          <input type='text' name='lastname' onChange={handleChange} value={formData?.lastname} />
        </div>
      </div>
      <div className='column-2'>
        <div className='form-field'>
          Department
          <input type='text' name='department' onChange={handleChange} value={formData?.department} />
        </div>
        <div className='form-field'>
          Reporting Manager
          <input type='text' name='manager' onChange={handleChange} value={formData?.manager} />
        </div>
      </div>
      <div className='column-2'>
        <div className='form-field'>
          Email
          <input type='text' name='email' onChange={handleChange} value={formData?.email} />
        </div>
        <div className='form-field'>
          Contact Number
          <input type='text' name='phone' onChange={handleChange} value={formData?.phone} />
        </div>
      </div>
      <p className='error-message'>{error && error?.errors[0] && error?.errors[0]?.msg}</p>
      <div className='actions'>
        <button className='action' onClick={closeModal}>Cancel</button>
        <button className='action'  disabled={!valid} onClick={onSubmit}>Save</button>
      </div>
    </div>
  )
}

export default UserForm;