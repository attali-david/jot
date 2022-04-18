import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useParams, useNavigate, Link} from 'react-router-dom'
import Entries from './Entries'
import {query, collection, getFirestore, onSnapshot, where } from 'firebase/firestore'
import {useAuth} from '../../AuthProvider'
import { CRow, CCol, CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton} from '@coreui/react'

import image from '../../assets/images/react.jpg'

export let journalData = []

const Journal = (props) => {
  let {id} = useParams()
  const [journal, setJournal] = useState()
  const [journalCollection, setJournalCollection] = useState([])
  const {user} = useAuth()
  const navigate = useNavigate('')

  useEffect(() => {
    journalQuery()
  }, [])

  const journalQuery = () => {
    const q = query(collection(getFirestore(), "journals"), where("user", "==", user.userName));
    onSnapshot(q, (snapshot) => {
      setJournalCollection(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    })
    journalData = journalCollection
  }

  return (
    <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
      {journalCollection.map(journal => (
        <CCol xs key={journal.id}>
          <Link
            to={`/journal/${journal.id}`} state={journal}
          style={{ textDecoration: 'none', color:'black' }}>
            <CCard className="h-100">
              <CCardImage orientation="top" src={image} />
              <CCardBody>
                <CCardTitle>{journal.title}</CCardTitle>
                <CCardText>
                  {journal.description}
                </CCardText>
              </CCardBody>
            </CCard>
        </Link>
        </CCol>
      ))}
    </CRow>
  )
}

export default Journal
