import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import DeleteWarning from '../components/DeleteWarning';
import Modal from '../components/Modal';
import Table from '../components/Table';
import UserForm from '../components/UserForm';
import { loadOrgnisations } from '../redux/actions/organisation';
import { createUser, deleteUser, deselectUser, loadUsers, selectUser, updateUser } from '../redux/actions/user';

import './dashboard-styles.css';

const Users = () => {
  const [open, setOpen] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [formData, setFormData] = useState({});

  const userList = useSelector((state) => state.user.userList, shallowEqual);
  const currentUserRole = useSelector((state) => state.login?.loggedInUser?.role);
  const selectedUsers = useSelector((state) => state.user.selectedUsers);
  const orgList = useSelector((state) => state.organisation.orgList);
  const loading = useSelector((state) => state.loader.loading);
  const error = useSelector((state) => state.loader.error);
  const dispatch = useDispatch();

  const onSave = () => {
    if (formData?._id) dispatch(updateUser(formData));
    else dispatch(createUser({ ...formData }));
  }

  const onDeleteConfirm = () => {
    dispatch(deleteUser(selectedUsers[0]));
  }

  const hideModal = () => {
    dispatch(deselectUser([]));
    setOpen(false);
    setShowDeleteWarning(false);
    setFormData({});
  }

  const setSelectedRow = (selection) => {
    if (Array.isArray(selection)) {
      if (selectedUsers.length === userList.length)
        dispatch(deselectUser([]));
      else dispatch(selectUser(selection));
    } else {
      if (!selectedUsers.find(user => user?._id === selection?._id))
        dispatch(selectUser(selection));
      else dispatch(deselectUser(selection));
    }
  }

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    setOpen(false);
    setShowDeleteWarning(false);
    setFormData({});
  }, [userList])

  useEffect(() => {
    if (!selectedUsers?.length && !error) {
      setOpen(false);
      setShowDeleteWarning(false);
      setFormData({});
    }
    if (selectedUsers?.length === 1) setFormData(selectedUsers[0]);
  }, [selectedUsers, error]);

  const columns = [
    {
      label: (
        <div className='selector'>
          <input type='checkbox' onChange={() => setSelectedRow(userList)} checked={selectedUsers.length === userList.length} />
        </div>
      ),
      accessor: "avatar",
      Cell: (props) => {
        const value = !!selectedUsers.find(user => user?._id === props.data?._id);
        return (
          <div className='selector'>
            <input type='checkbox' onChange={() => setSelectedRow(props.data)} checked={value} />
          </div>)
      }
    },
    {
      label: "Avatar",
      accessor: "_id",
      Cell: (props) => {
        return (
          <div className='avatar'>
            <img
              src={props.data.avatar}
              alt='avatar'
            />
          </div>)
      }
    },
    { label: "First Name", accessor: "firstname", sortable: true },
    { label: "Last Name", accessor: "lastname", sortable: true },
    { label: "Department", accessor: "department" },
    { label: "Reporting Manager", accessor: "manager" },
    // {
    //   label: "Organisation", accessor: "orgName", sortable: true
    // },
    {
      label: "Email", accessor: "email", sortable: true
    },
    // {
    //   label: "Role", accessor: "role", sortable: true
    // }
    // { label: "Users", accessor: "users", sortable: true },
    // { label: "Start Date", accessor: "startDate", sortable: true },
    // { label: "End Date", accessor: "endDate", sortable: true },
    {
      label: "Actions", accessor: "actions", Cell: (props) => (
        <div className='table-actions' >
          <img
            src='/edit.png'
            alt='edit-icon'
            className='table-action'
            onClick={() => {
              setOpen(true);
              dispatch(loadOrgnisations());
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
        <h2>User Dashboard</h2>
        <div className='action-bar'>
          <button className='action-bar-button' onClick={() => {
            setOpen(true);
            dispatch(loadOrgnisations());
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
              data={userList}
              columns={columns}
            />)
          }
      </div>
      {open && (
        <Modal
          displayModal={open}
          closeModal={hideModal}
          title='Add New'
        >
          <UserForm formData={formData} orgList={orgList} currentUserRole={currentUserRole} closeModal={hideModal} handleFormDataChange={setFormData} onSubmit={onSave} error={error} />
        </Modal>
      )}
      {showDeleteWarning && selectedUsers[0] && (
        <Modal
          displayModal={showDeleteWarning}
          closeModal={hideModal}
          title='Are you sure?'
        >
          <DeleteWarning name={`${selectedUsers[0]?.firstname} ${selectedUsers[0]?.lastname}`} onConfirm={onDeleteConfirm} closeModal={hideModal} />
        </Modal>
      )}
    </div>
  )
}

export default Users