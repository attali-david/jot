import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom'

import {getFirestore, addDoc, collection } from 'firebase/firestore'

import { CRow, CCol, CCard, CCardHeader, CButton, CCardFooter, CCloseButton, CListGroup, CListGroupItem } from '@coreui/react'

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import  'froala-editor/js/plugins/image.min.js';
import  'froala-editor/js/plugins/video.min.js';
import  'froala-editor/js/plugins/colors.min.js';
import  'froala-editor/js/plugins/emoticons.min.js';
import  'froala-editor/js/plugins/font_family.min.js';
import  'froala-editor/js/plugins/font_size.min.js';
import  'froala-editor/js/plugins/line_height.min.js';
import  'froala-editor/js/plugins/lists.min.js';
import  'froala-editor/js/plugins/align.min.js';
import  'froala-editor/js/plugins/link.min.js';
import  'froala-editor/js/plugins/file.min.js';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/video.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/emoticons.min.css';
import 'froala-editor/css/plugins/file.min.css';

import FroalaEditor from 'react-froala-wysiwyg';

import {useAuth} from '../../AuthProvider'


const getTime = () => {
   const date = new Date();

   function padTo2Digits(num) {
     return num.toString().padStart(2, '0');
   }

   const year = date.getFullYear();
   const month = padTo2Digits(date.getMonth() + 1);
   const day = padTo2Digits(date.getDate());

   return [month, day, year].join(' / ');
}


const Editor = (props) => {
  const {user} = useAuth()
  const [input, setInput] = useState({model:'', timestamp:''})
  const [hashtags, setHashtags] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const settings = {
      toolbarButtons: {
        'moreRich': {
            'buttons': ['insertImage', 'insertVideo', 'insertLink', 'insertFile', 'emoticons'],
            buttonsVisible: 5
          },
        'moreText': {
            'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting', 'alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
            buttonsVisible: 0
          }
      },
      autofocus: true,
      placeholderText: "What's on your mind?",
      attribution: false,
    };

  useEffect(() => {
    setInput({...input, timestamp: getTime()})
  }, [])

    const handleModelChange = (model) => {
      setInput({...input, model: model})
      // setHashtags([...input.model.matchAll(/#\w+/g)].map(match => (
      //   match[0]
      // )))
      // console.log(hashtags)
      // const replace = input.model.replaceAll(regex, `<span style="background-color: rgb(147, 101, 184); color: rgb(239, 239, 239);">$&</span>`)
    }

    const submitHandler = async () => {
      // hashtags.forEach(match => (
      //   setInput({tags:{...input.tags, match:true}})
      //   console.log(input.tags)
      // ))
      try {
        const docRef = await addDoc(collection(getFirestore(), "journals", `${location.state.id}`, "entries"),{
          text: input.model,
          entryDate: input.timestamp,
          journal: location.state.title,
          user: location.state.user
        })
      } catch (e) {
        console.error('Error: ', e)
      }
      navigate(`/journal/${location.state.id}`)
    }

  const closeHandler = () => {
    navigate(-1, { replace: true })
  }

  return (
      <CCard
        textColor='primary'
        className="mw-75 h-100 border-primary border-top-primary border-top-3"
      >
      <CCardHeader className="d-grid gap-2 d-md-flex justify-content-between">
          {input.timestamp}
          <CCloseButton onClick={closeHandler}/>
      </CCardHeader>
          <FroalaEditor
          tag='textarea'
          config={settings}
          model={input.model}
          onModelChange={handleModelChange}
          />
        <CCardFooter className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton color="primary" className="me-md-2" onClick={submitHandler}>
              Save
            </CButton>
        </CCardFooter>
      </CCard>
  )
}

export default Editor
