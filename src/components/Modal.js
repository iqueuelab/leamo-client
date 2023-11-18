//Modal.js
import React from 'react';
const Modal = ({ title, children, displayModal, closeModal }) => {

  const divStyle = {
    display: displayModal ? 'flex' : 'none'
  };
  function close(e) {
    e.stopPropagation();
    closeModal();
  }

  return (
    <div
      className="modal"
      onClick={close}
      style={divStyle} >
      <div className='modal-box'>
        <div className="header-section">
          <h3>{title}</h3>
          <span
            className="close"
            onClick={close}>&times;
          </span>
        </div>
        <div
          className="modal-container"
          onClick={e => e.stopPropagation()} >
          {children}
        </div>
      </div>
    </div>
  );
}
export default Modal;