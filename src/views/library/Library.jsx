import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {query, collection, getFirestore, onSnapshot, where } from 'firebase/firestore'
import {useAuth} from '../../AuthProvider'

import { CRow, CCol, CCard, CImage, CCardBody, CCardTitle, CCardText, CButton} from '@coreui/react'

const Library = (props) => {
  const [shelves, setShelves] = useState([])
  const {user} = useAuth()

  useEffect(() => {
    libraryQuery()
  },[])

  const libraryQuery = () => {
    const q = query(collection(getFirestore(), "library"), where("user", "==", user.userName));
    onSnapshot(q, (snapshot) => {
      setShelves(snapshot.docs.map(
        (doc) => (
          {...doc.data(), id:doc.id}
      )))
    })
  }
  if (!!shelves) {
  return (
    <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
      {shelves.map(book => (
        <CCol xs key={book.id}>
            <CCard className="h-100">
              <CImage fluid rounded thumbnail orientation="top" src={book.image} />
              <CCardBody>
                <CCardTitle>{book.title}</CCardTitle>
                <CCardText>
                  {book.published}
                </CCardText>
              </CCardBody>
            </CCard>
        </CCol>
      ))}
    </CRow>
  )
}
  return <h1>Add Books</h1>
}

export default Library
