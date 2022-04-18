import React from 'react'
import PropTypes from 'prop-types'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {useAuth} from './AuthProvider'

const ProtectedRoute = ({children}) => {
  const {loggedIn} = useAuth()
  const location = useLocation()

  if(!loggedIn) {
    console.log('Not logged in')
    return <Navigate to='/login' replace state={{from: location}}/>
  }
    return <Outlet/>
}

export default ProtectedRoute
