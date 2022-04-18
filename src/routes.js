import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Journal = React.lazy(() => import('./views/journal/Journal'))
const JournalForm = React.lazy(() => import('./views/journal/JournalForm'))
const Entries = React.lazy(() => import('./views/journal/Entries'))
const Editor = React.lazy(() => import ('./views/journal/Editor'))
const BookForm = React.lazy(() => import ('./views/library/BookForm'))
const Library = React.lazy(() => import ('./views/library/Library'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/journal', name: 'Journals', element: Journal, exact: true },
  { path: '/create-journal', name: 'Create Journal', element: JournalForm},
  { path: '/journal/:id', name: 'Entries', element: Entries, exact: true},
  {path: '/journal/editor', name: 'Editor', element: Editor, exact: true},
  {path: '/library', name: 'Library', element: Library, exact: true},
  {path: '/add-book', name: 'Add Book', element: BookForm, exact: true}
]


export default routes
