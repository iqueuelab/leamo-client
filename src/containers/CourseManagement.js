import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseForm from '../components/CourseForm';
import DeleteWarning from '../components/DeleteWarning';
import Modal from '../components/Modal';
import Table from '../components/Table';
import { DeleteIcon, EditIcon, ShareIcon } from '../icons';
import { createCourse, deleteCourse, deselectCourse, loadCourses, selectCourse, updateCourse } from '../redux/actions/course';

import CourseShareForm from '../components/CourseShareForm';
import './dashboard-styles.css';

const CourseManagement = () => {
  const [open, setOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [formData, setFormData] = useState({});

  const courseList = useSelector((state) => state.course.courseList);
  const selectedCourses = useSelector((state) => state.course.selectedCourses);
  const loading = useSelector((state) => state.loader.loading);
  const error = useSelector((state) => state.loader.error);
  const dispatch = useDispatch();

  const onSave = () => {
    if (formData?._id) dispatch(updateCourse(formData));
    else dispatch(createCourse({ ...formData }));
  }

  const onDeleteConfirm = () => {
    dispatch(deleteCourse(selectedCourses[0]));
  }

  const hideModal = () => {
    dispatch(deselectCourse([]));
    setOpen(false);
    setShowDeleteWarning(false);
    setFormData({});
  }

  const setSelectedRow = (selection) => {
    if (Array.isArray(selection)) {
      if (selectedCourses.length === courseList.length)
        dispatch(deselectCourse([]));
      else dispatch(selectCourse(selection));
    } else {
      if (!selectedCourses.find(course => course?._id === selection?._id))
        dispatch(selectCourse(selection));
      else dispatch(deselectCourse(selection));
    }
  }

  useEffect(() => {
    dispatch(loadCourses());
  }, [dispatch]);


  useEffect(() => {
    if (!selectedCourses?.length && !loading && !error) {
      setOpen(false);
      setShowDeleteWarning(false);
      setFormData({});
    }
    if (selectedCourses?.length === 1) setFormData(selectedCourses[0]);
  }, [selectedCourses, loading, error]);

  const columns = [
    { label: "Name", accessor: "name", sortable: true },
    { label: "Type", accessor: "type", sortable: true },
    { label: "Author", accessor: "author", sortable: true },
    { label: "Duration", accessor: "duration", sortable: true },
    { label: "End Date", accessor: "endDate", sortable: true },
    { label: "Enrolled Users", accessor: "enrolledUsers", sortable: true },
    { label: "Ratings", accessor: "ratings", sortable: true },
    { label: "Ciry", accessor: "city", sortable: true },
    {
      label: "Actions", accessor: "actions", Cell: (props) => (
        <div className='table-actions' >
          <EditIcon 
            className='table-action'
            onClick={() => {
              setOpen(true);
              setSelectedRow(props.data);
            }}
          />
          <ShareIcon 
            className='table-action'
            onClick={() => {
              setIsSharing(true);
              setSelectedRow(props.data);
            }}
          />
          <DeleteIcon 
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
        <h2>Course Management</h2>
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
              data={courseList}
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
          <CourseForm formData={formData} closeModal={hideModal} handleFormDataChange={setFormData} onSubmit={onSave} error={error} />
        </Modal>
      )}
      {isSharing && selectedCourses.length !== 0 && (
        <Modal
          displayModal={isSharing}
          closeModal={hideModal}
          title='Share Courses'
        >
          <CourseShareForm selectedCourses={selectedCourses} />
        </Modal>
      )}
      {showDeleteWarning && selectedCourses[0] && (
        <Modal
          displayModal={showDeleteWarning}
          closeModal={hideModal}
          title='Are you sure?'
        >
          <DeleteWarning name={`${selectedCourses[0]?.name} created by ${selectedCourses[0]?.author}`} onConfirm={onDeleteConfirm} closeModal={hideModal} />
        </Modal>
      )}
    </div>
  )
}

export default CourseManagement;