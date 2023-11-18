import { Link, useLocation } from 'react-router-dom';
import { CourseIcon, HomeIcon, TenancyIcon, UserIcon } from '../icons';
import './sidebar.css';

const Sidebar = ({loggedInUser}) => {
  const location = useLocation();
  const menus =  [{
    icon: <HomeIcon />,
    label: 'Dashboard',
    link: '/dashboard'
  }]

  if(loggedInUser?.role === 'SuperAdmin') {
    menus.push({
      icon: <TenancyIcon />,
      label: 'Multi-tenancy',
      link: '/multi-tenancy'
    },
    {
      icon: <UserIcon />,
      label: 'Users',
      link: '/users'
    },
    {
      icon: <CourseIcon />,
      label: 'Courses',
      link: '/courses'
    });
  }

  if(loggedInUser?.role === 'Admin') {
    menus.push({
      icon: <UserIcon />,
      label: 'Users',
      link: '/users'
    },
    {
      icon: <CourseIcon />,
      label: 'Courses',
      link: '/courses'
    });
  }

  return (
    <div className='sidebar-container'>
      {menus.map((menuItem) => (
        <li className='menu-item' key={menuItem.link}>
          <Link to={menuItem.link} className={location.pathname === menuItem.link ? 'active-menu-label' : 'menu-label'}>
            <div className='menu-icon'>{menuItem.icon}</div>
            <p>{menuItem.label} </p>
          </Link>
        </li>
      ))}
    </div>
  )
}

export default Sidebar;