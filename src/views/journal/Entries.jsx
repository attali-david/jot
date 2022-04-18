import React, {useState, useEffect} from 'react'
import {useParams, useLocation, Link} from 'react-router-dom'

import {getFirestore, doc, getDoc, onSnapshot, collection} from 'firebase/firestore'

import { CRow, CCol, CCard, CCardHeader, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CCardFooter, CDropdownToggle, CDropdown, CDropdownItem, CDropdownMenu, CListGroup, CListGroupItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilOptions} from '@coreui/icons'

import {useAuth} from '../../AuthProvider'

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


const Entries = () => {
  const [entries, setEntries] = useState([])
  const {user} = useAuth()
  const params = useParams()
  const location = useLocation()

  useEffect(() => {
    journalQuery()
  }, [params.id])


  const journalQuery = () => {
    onSnapshot(collection(getFirestore(), "journals", `${params.id}`, "entries"), (snapshot) => {
      setEntries(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    }
  )}

  const config = {
    attribution: false,
  }

  return (
    <>
    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
      {entries.map(journal => (
        <CCol xs key={journal.id}>
          <CCard>
            <CCardHeader className="d-grid gap-2 d-md-flex justify-content-between">
              {journal.entryDate}
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={cilOptions} className="text-high-emphasis" />
                </CDropdownToggle>
                  <CDropdownMenu>
                  <CDropdownItem>Edit</CDropdownItem>
                  <CDropdownItem>Delete</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCardHeader>
            <CCardBody>
              <FroalaEditorView
                model={journal.text}
                config={config}
                key={journal.id}
              />
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Link to='/journal/editor' state={location.state}>
        <CButton color="primary" className="me-md-2">
          New Entry
        </CButton>
      </Link>
    </div>
    </>
  )
}

export default Entries
