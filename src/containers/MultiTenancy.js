import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DeleteWarning from '../components/DeleteWarning';
import Modal from '../components/Modal';
import MultiTenancyForm from '../components/MultiTenancyForm';
import Table from '../components/Table';
import {
  createOrgnisation, deleteOrganisation, deselectTenancy, loadOrgnisations, selectTenancy, updateOrgnisation,
} from '../redux/actions/organisation';

import './dashboard-styles.css';

const MultiTenancy = () => {
  const [open, setOpen] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [formData, setFormData] = useState({});

  const orgList = useSelector((state) => state.organisation.orgList);
  const selectedTenancy = useSelector((state) => state.organisation.selectedTenancy, shallowEqual);
  const loading = useSelector((state) => state.loader.loading);
  const error = useSelector((state) => state.loader.error);
  const dispatch = useDispatch();

  const onSave = () => {
    if (formData?._id) dispatch(updateOrgnisation(formData));
    else dispatch(createOrgnisation(formData));
  }

  const onDeleteConfirm = () => {
    dispatch(deleteOrganisation(selectedTenancy));
  }

  const hideModal = () => {
    dispatch(deselectTenancy());
    setOpen(false);
    setShowDeleteWarning(false);
    setFormData({});
  }

  const setSelectedRow = (selectedTenancy) => {
    dispatch(selectTenancy(selectedTenancy));
  }

  useEffect(() => {
    dispatch(loadOrgnisations());
  }, [dispatch]);


  useEffect(() => {
    setOpen(false);
    setShowDeleteWarning(false);
    setFormData({});
  }, [orgList])

  useEffect(() => {
    if (!selectedTenancy && !error) {
      setOpen(false);
      setShowDeleteWarning(false);
      setFormData({});
    }
    if (selectedTenancy) setFormData(selectedTenancy);
  }, [selectedTenancy, loading, error]);

  const columns = [
    { label: "Name", accessor: "name", sortable: true },
    { label: "Sub Domain", accessor: "subdomain", sortable: true },
    { label: "Users", accessor: "users", sortable: true },
    { label: "Start Date", accessor: "startDate", sortable: true, Cell:({data}) => {
      const startDate = new Date(data.startDate);
      return startDate.getFullYear()+'-' + (startDate.getMonth()+1) + '-'+startDate.getDate();
    } },
    { label: "End Date", accessor: "endDate", sortable: true,Cell:({data}) => {
      const endDate = new Date(data.endDate);
      return endDate.getFullYear()+'-' + (endDate.getMonth()+1) + '-'+endDate.getDate();
    } },
    {
      label: "Actions", accessor: "actions", Cell: (props) => (
        <div className='table-actions' >
          <img
            src='/edit.png'
            alt='edit-icon'
            className='table-action'
            onClick={() => {
              setOpen(true);
              setSelectedRow(props.data);
            }}
          />
          <img
            src='/delete.png'
            alt='delete-icon'
            className='table-action'
            onClick={() => {
              setSelectedRow(props.data);
              setShowDeleteWarning(true);
            }}
          />
        </div>
      )
    },
  ];

  return (
    <div className='container'>
      <div className='top-bar'>
        <h2>Companies</h2>
        <div className='action-bar'>
          <button className='action-bar-button' onClick={() => {
            setOpen(true)
          }
          }>
            Add New
            <img src='/add.png' alt='add-new' />
          </button>
        </div>
      </div>
      <div className='content-zone'>
        {loading 
          ? 'Loading ...' 
          : (<Table
              data={orgList}
              columns={columns}
            />)
          }
      </div>
      {open && (
        <Modal
          displayModal={open}
          closeModal={hideModal}
          title={selectedTenancy ? 'Edit Organisation' :'Add New Organisation'}
        >
          <MultiTenancyForm formData={formData} closeModal={hideModal} handleFormDataChange={setFormData} onSubmit={onSave} error={error} />
        </Modal>
      )}
      {showDeleteWarning && selectedTenancy && (
        <Modal
          displayModal={showDeleteWarning}
          closeModal={hideModal}
          title='Are you sure?'
        >
          <DeleteWarning name={selectedTenancy?.name} onConfirm={onDeleteConfirm} closeModal={hideModal} />
        </Modal>
      )}
    </div>
  )
}

export default MultiTenancy;