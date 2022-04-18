import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'

import {addDoc, collection, getFirestore, serverTimestamp, handle} from 'firebase/firestore'
import {useAuth} from '../../AuthProvider'

import { CForm, CFormInput, CFormLabel, CButton } from '@coreui/react'


const JournalForm = ({initialJournal, handleClose}) => {
  const {user} = useAuth()
  const navigate = useNavigate('')
  const [journals, setJournals] = useState({title: '', bookTitle:'', bookAuthor:'', description:'', user: user.userName})


  const inputHandler = (e) => {
    const {value, name} = e.target
    setJournals({...journals, [name]:value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(getFirestore(), "journals"),{
        title: journals.title,
        bookTitle: journals.bookTitle,
        bookAuthor: journals.bookAuthor,
        description: journals.description,
        timestamp: serverTimestamp(),
        user: user.userName,
      });
      console.log('Document written with ID: ', docRef.id);
      setJournals({title: '', bookTitle:'', bookAuthor:'', description:'', user:user.userName})
      navigate('/journal')
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
    <CForm onSubmit={submitHandler}>
      <div className="mb-3">
        <CFormLabel htmlFor="title">Journal Title</CFormLabel>
        <CFormInput type="text" name="title" value={journals.title} aria-describedby="emailHelp" onChange={inputHandler}/>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="bookTitle">Book Title</CFormLabel>
        <CFormInput type="text" name="bookTitle" value={journals.bookTitle} onChange={inputHandler}/>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="bookAuthor">Book Author</CFormLabel>
        <CFormInput type="text" name="bookAuthor" value={journals.bookAuthor} onChange={inputHandler}/>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="description">Description</CFormLabel>
        <CFormInput type="text" name="description" value={journals.description} onChange={inputHandler}/>
      </div>
      <CButton type="submit" color="primary">
        Submit
      </CButton>
    </CForm>
  )
}

export default JournalForm
