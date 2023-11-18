import React from 'react';

const DeleteWarning = ({ name, closeModal, onConfirm }) => {
  return (
    <div>
      <p>
        You really want to delete entry name: <br />
        <b>{name}</b>
      </p>
      <div className='actions'>
        <button className='action' onClick={closeModal}>Cancel</button>
        <button className='action' onClick={onConfirm}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteWarning;