import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const UserProfile = () => {
  return (
    <>
    <NavLink  to='articles' className='fs-4  nav-link mt-4'>
     <button type='submit' className='btn btn-info ml-5'> Articles</button>
      </NavLink>
    <Outlet/>
    </>
  )
}

export default UserProfile