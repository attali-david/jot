import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import { CForm, CFormInput, CFormLabel, CButton, CFormCheck, CRow, CCol, CCard, CCardImage, CCardBody, CCardTitle, CCardText, CCardHeader } from '@coreui/react'

import {addDoc, collection, getFirestore, serverTimestamp, handle} from 'firebase/firestore'
import {useAuth} from '../../AuthProvider'

const BookForm = (props) => {
  const [inputs, setInputs] = useState({title:'', author:''})
  const [results, setResults] = useState()
  const [toggle, setToggle] = useState(false)
  const {user} = useAuth()

  useEffect(() => {
    console.log(results)
  }, [toggle])

  const inputHandler = (e) => {
    const {value, name} = e.target
    setInputs({...inputs, [name]:value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${inputs.title}+inauthor:${inputs.author}&maxResults=6&key=AIzaSyDdLcE2Enx_RB7CWjS_QUBGECZPt0pf_VA`)
      const request = await data.json()
      setResults(request.items)
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setToggle(true)
    setInputs({title:'', author:''})
  }

  const addBook = async (data, path) => {
    try {
      const shelf = await addDoc(collection(getFirestore(), "library"),{
        title: data.volumeInfo.title,
        author: data.volumeInfo.authors,
        image: data.volumeInfo.imageLinks.smallThumbnail,
        published: data.volumeInfo.publishedDate,
        category: data.volumeInfo.categories[0],
        user: user.userName,
        book: data
      });
      const subShelf = await addDoc(collection(getFirestore(), path),{
        title: data.volumeInfo.title,
        author: data.volumeInfo.authors,
        image: data.volumeInfo.imageLinks.smallThumbnail,
        published: data.volumeInfo.publishedDate,
        category: data.volumeInfo.categories[0],
        user: user.userName,
      });
      console.log('Document written with ID: ', shelf.id);
      navigate('/library')
    } catch {
      console.error('Error adding document: ');
    }
    setToggle(false)
  }

  // <CCardImage orientation="top" src={book.volumeInfo.imageLinks.thumbnail || }/>


  return (
    <>
      <CForm onSubmit={submitHandler}>
        <div className="mb-3">
          <CFormLabel htmlFor="bookTitle">Book Title</CFormLabel>
          <CFormInput type="text" name="title" value={inputs.bookTitle} onChange={inputHandler}/>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="bookAuthor">Book Author</CFormLabel>
          <CFormInput type="text" name="author" value={inputs.bookAuthor} onChange={inputHandler}/>
        </div>
        <CButton type="submit" color="primary" onClick={submitHandler}>
          Search
        </CButton>
      </CForm>
      {!!toggle &&
        <>
        <h2>Results</h2>
          {results.map(book => (
            <CCard className="mb-3" style={{ maxWidth: '540px' }} key={book.id}>
              <CRow className="g-0">
                <CCol md={4}>
                </CCol>
                <CCol md={8}>
                  <CCardBody>
                    <CCardTitle>{book.volumeInfo.title} by {book.volumeInfo.authors}</CCardTitle>
                    <CCardText>
                      Published {book.volumeInfo.publishedDate}
                    </CCardText>
                  </CCardBody>
                    <CButton onClick={() => addBook(book, 'reading')}>Add to Reading</CButton>
                    <CButton onClick={() => addBook(book, 'stack')}>Add to Stack</CButton>
                </CCol>
              </CRow>
            </CCard>
          ))}
        </>
      }
    </>
  )
}

export default BookForm
