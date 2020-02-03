import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const DropdownMenuStyle = makeStyles((theme: Theme) => ({
  menu: {
    width: '14rem',
    position: 'absolute',
    top: '2.5rem',
    right: '0.5rem',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.2)',
    overflow: 'hidden',
  },
  menuListContainer: {
    margin: '0',
    padding: '0',
    listStyleType: 'none',
    '& li:not(:first-child)': {
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
  },
  menuListItem: {
    fontWeight: 600,
    margin: `0 ${theme.typography.pxToRem(20)}`,
    padding: `${theme.typography.pxToRem(8)} 0`,
    color: theme.palette.text.primary,
    borderTop: '1px solid #EBEBEB',
    '& span': {
      display: 'inline-block',
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(12),
    },
  },
}))

interface DropdownMenuProps {
  name: string
  email: string
  onSignOut: () => void
  onMyAccount: () => void
}

const DropdownMenu = ({ name, email, onSignOut, onMyAccount }: DropdownMenuProps) => {
  const classes = DropdownMenuStyle()
  return (
    <div className={classes.menu} data-testid="menu-profile-dropdown-menu">
      <ul className={classes.menuListContainer}>
        <li>
          <div className={classes.menuListItem} style={{ borderTop: 'none' }}>
            <Typography variant="subtitle2" data-testid="menu-profile-dropdown-menu-name">
              <b>{name}</b>
            </Typography>
            <Typography variant="caption" data-testid="menu-profile-dropdown-menu-email">
              {email}
            </Typography>
          </div>
        </li>
        <li>
          <div className={classes.menuListItem} onClick={onMyAccount}>
            <Typography
              variant="subtitle2"
              style={{ color: '#3367AB' }}
              data-testid="menu-profile-dropdown-menu-myaccount"
            >
              My Account
            </Typography>
          </div>
        </li>
        <li>
          <div className={classes.menuListItem} onClick={onSignOut}>
            <Typography
              variant="subtitle2"
              style={{ color: '#FF585F' }}
              data-testid="menu-profile-dropdown-menu-signout"
            >
              Sign out
            </Typography>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default DropdownMenu
