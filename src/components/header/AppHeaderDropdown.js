import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderBrand
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

import {useAuth} from '../../AuthProvider'

const AppHeaderDropdown = () => {
  const {user} = useAuth()
  return (
    <>
    <CHeaderBrand>
      Hi, {user.userName}
    </CHeaderBrand>
    <CAvatar src={user.profilePic} size="md" />
    </>
  )
}

export default AppHeaderDropdown
