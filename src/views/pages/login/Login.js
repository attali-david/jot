import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { useAuth } from '../../../AuthProvider'

const Login = () => {
  const {signInWithGoogle, signInWithEmail, initFirebaseAuth} = useAuth()
  const [inputs, setInputs] = useState({username:'', password: ''})

  useEffect(() => {
    initFirebaseAuth()
  }, [])

  const formHandler = (e) => {
    const {name, value} = e.target
    setInputs({...inputs, [name]:value})
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" name="username" value={inputs.username} onChange={formHandler} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={inputs.password}
                        onChange={formHandler}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={() => signInWithEmail(inputs)}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6}>
                        <Link to="/register">
                          <CButton color="primary" className="px-4">
                            Register
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div className="btn-group-vertical">
                    <h2>Sign In With</h2>
                    <CButton color="primary" className="mt-3" active tabIndex={-1} onClick={signInWithGoogle}>
                      Google
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
