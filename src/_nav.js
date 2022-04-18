import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilBook,
  cilCoffee,
  cilShortText,
  cilEducation,
  cilBookmark,
  cilPlus
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Documents ',
  },
  {
    component: CNavItem,
    name: 'Create Journal',
    to: '/create-journal',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Journals',
    to: '/journal',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Books',
  },
  {
    component: CNavItem,
    name: 'Add Book',
    to: '/add-book',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Library',
    to: '/library',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reading Now',
    to: '/base',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Book Recommendations',
    to: '/base',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
  },
  {
    component: CNavItem,
    name: 'Sign Out',
    to: '/login',
  },
]

export default _nav
