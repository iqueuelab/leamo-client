import React, { useEffect, useState } from 'react';
import { validateEmail } from '../utils/formValidators';

const MultiTenancyForm = ({ formData = {}, closeModal, handleFormDataChange, onSubmit, error }) => {
  const [valid, setValidForm] = useState(false);

  const handleChange = (event) => {
    let formDataToSet = {...formData};
    if(event.target.name === 'autoRenewal') {
      formDataToSet = { ...formData, [event.target.name]: event.target.checked };
    } else {
      formDataToSet = { ...formData, [event.target.name]: event.target.value };
    }
    handleFormDataChange({ ...formDataToSet });
  }

  useEffect(() => {
    if(!formData.name || !formData.subdomain || !formData.address 
      || !formData.country || !formData.state || !formData.users || !formData.gstin
      || !formData.startDate || !formData.endDate || !formData.primaryAdminName 
      || !formData.contactNumber || !formData.email || !validateEmail(formData.email)) {
        setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [formData]);

  return (
    <div className='form'>
      <div className='form-field'>
        Comapny Name
        <input type='text' name='name' onChange={handleChange} value={formData?.name} />
      </div>
      <div className='column-3-2'>
        <div className='form-field'>
          Sub Domain
          <input type='text' name='subdomain' onChange={handleChange} value={formData?.subdomain} />
        </div>
        <div className='form-field'>
          Address
          <input type='text' name='address' onChange={handleChange} value={formData?.address} />
        </div>
      </div>
      <div className='column-2'>
        <div className='form-field'>
          Country
          <input type='text' name='country' onChange={handleChange} value={formData?.country} />
        </div>
        <div className='form-field'>
          State
          <input type='text' name='state' onChange={handleChange} value={formData?.state} />
        </div>
      </div>
      <div className='column-2'>
        <div className='form-field'>
          Users Count
          <input type='number' name='users' onChange={handleChange} value={formData?.users} />
        </div>
        <div className='form-field'>
          GSTIN
          <input type='text' name='gstin' onChange={handleChange} value={formData?.gstin} />
        </div>
      </div>
      <div className='column-3'>
        <div className='form-field'>
          Start Date
          <input type='date' name='startDate' onChange={handleChange} value={formData?.startDate} />
        </div>
        <div className='form-field'>
          End Date
          <input type='date' name='endDate' onChange={handleChange} value={formData?.endDate} />
        </div>
        <div className='form-field checkbox'>
          Auto Renewal
          <input type='checkbox' name='autoRenewal' onChange={handleChange} checked={formData?.autoRenewal} />
        </div>
      </div>
      <div className='form-field'>
        Primary Admin Name
        <input type='text' name='primaryAdminName' onChange={handleChange} value={formData?.primaryAdminName} />
      </div>
      <div className='column-3-2'>
        <div className='form-field'>
          Contact Number
          <input type='text' name='contactNumber' onChange={handleChange} value={formData?.contactNumber} />
        </div>
        <div className='form-field'>
          Email Address
          <input type='text' name='email' onChange={handleChange} value={formData?.email} autoComplete={false}/>
        </div>
      </div>
      <p className='error-message'>{error && error.errors[0] && error.errors[0].msg}</p>
      <div className='actions'>
        <button className='action' onClick={closeModal}>Cancel</button>
        <button className='action' disabled={!valid} onClick={onSubmit}>Save</button>
      </div>
    </div>
  )
}

export default MultiTenancyForm;