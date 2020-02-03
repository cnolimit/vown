import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import DropdownButton from './dropdown-button'
import DropdownMenu from './dropdown-menu'

const MenuProfileStyle = makeStyles((theme: Theme) => ({
  menuProfile: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 40px',
    gridTemplateRows: '15px 15px',
    position: 'relative',
  },
  menuProfileImage: {
    gridRow: '1 / 3',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  menuProfileName: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    textTransform: 'capitalize',
    lineHeight: 'initial',
  },
  menuProfileRole: {
    fontSize: theme.typography.pxToRem(12),
    textTransform: 'capitalize',
    gridRow: '2 / 3',
    lineHeight: 'initial',
  },
  menuProfileButton: {
    marginLeft: '10px',
    gridRow: 'span 2',
    alignSelf: 'center',
    backgroundPosition: 'center',
    cursor: 'pointer',
  },
}))

interface MenuProfileProps {
  role: string
  name: string
  image: string
  email: string
  onSignOut: () => void
  onMyAccount: () => void
}

const MenuProfile = ({ role, name, image, email, onSignOut, onMyAccount }: MenuProfileProps) => {
  const classes = MenuProfileStyle({ image })
  const [menuVisibility, setMenuVisibility] = useState(false)

  return (
    <div className={classes.menuProfile}>
      <div
        className={classes.menuProfileImage}
        style={{ backgroundImage: `url(${image})` }}
        data-testid="menu-profile-image"
      />
      <Typography
        variant="subtitle1"
        className={classes.menuProfileName}
        data-testid="menu-profile-name"
      >
        {name}
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.menuProfileRole}
        data-testid="menu-profile-role"
      >
        {role}
      </Typography>
      <DropdownButton
        className={classes.menuProfileButton}
        onClick={() => setMenuVisibility(!menuVisibility)}
      />
      {menuVisibility && (
        <DropdownMenu name={name} email={email} onSignOut={onSignOut} onMyAccount={onMyAccount} />
      )}
    </div>
  )
}

export default MenuProfile
