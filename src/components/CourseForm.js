import React, { useEffect, useState } from 'react';

const CourseForm = ({ formData = {}, closeModal, handleFormDataChange, onSubmit, error }) => {
  const [valid, setValidForm] = useState(false);

  const handleChange = (event) => {
    handleFormDataChange({ ...formData, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    if(!formData.name || !formData.type || !formData.author 
      || !formData.duration || !formData.city) {
        setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [formData]);

  return (
    <div className='form'>
      <div className='form-field'>
        Course Name
        <input type='text' name='name' onChange={handleChange} value={formData?.name} />
      </div>
      <div className='column-2'>
        <div className='form-field'>
          Course Type
          <select type='text' name='type' onChange={handleChange} value={formData?.type} defaultValue='default'>
            <option value="default" disabled>Select a course type</option>
            <option value='Blended'>Blended</option>
            <option value='VILT'>VILT</option>
            <option value='ILT'>ILT</option>
            <option value='Online'>Online</option>
          </select>
        </div>
        <div className='form-field'>
          Author
          <input type='text' name='author' onChange={handleChange} value={formData?.author} />
        </div>
      </div>
      <div className='column-2'>
        <div className='form-field'>
          Duration (In Min.)
          <input type='text' name='duration' onChange={handleChange} value={formData?.duration} />
        </div>
        <div className='form-field'>
          City
          <input type='text' name='city' onChange={handleChange} value={formData?.city} />
        </div>
      </div>
      <p className='error-message'>{error && error?.errors[0] && error?.errors[0].msg}</p>
      <div className='actions'>
        <button className='action' onClick={closeModal}>Cancel</button>
        <button className='action' disabled={!valid} onClick={onSubmit}>Save</button>
      </div>
    </div>
  )
}

export default CourseForm;