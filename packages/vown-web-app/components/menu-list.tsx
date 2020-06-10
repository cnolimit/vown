import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MenuProfile } from '@vown/components'
import { IUserDetails } from '@vown/types'
import Link from 'next/link'
import React from 'react'
import Placeholder from 'static/assets/placeholder.png'
import { NAVIGATION_LIST } from 'utils/constants'

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    listStyleType: 'none',
    justifyContent: 'center',
  },
  menuListItem: {
    display: 'inline',
    cursor: 'pointer',
    marginLeft: theme.typography.pxToRem(12),
    padding: `${theme.typography.pxToRem(4.5)} ${theme.typography.pxToRem(14)}`,
    backgroundColor: 'transparent',
    '&:not(:last-child)': {
      borderRadius: theme.shape.borderRadius,
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: '#F5F5F5',
      },
      '& a': {
        fontWeight: 'bold',
        color: theme.palette.text.primary,
        textDecoration: 'none',
      },
    },
  },
  menuListProfile: {
    marginLeft: theme.typography.pxToRem(19),
  },
}))

interface MenuListProps {
  user: IUserDetails
  onSignOut: () => void
  onMyAccount: () => void
}

const MenuList = ({ user, onSignOut, onMyAccount }: MenuListProps) => {
  console.log({ user })

  const classes = useStyles()
  const name = user.displayName || user.email.split('@')[0]
  const image = user.photoURL || Placeholder
  return (
    <React.Fragment>
      <ul className={classes.menu}>
        {NAVIGATION_LIST.map(nav => {
          return (
            <li className={classes.menuListItem} key={nav.link}>
              <Link href={nav.link}>
                <span>{nav.text}</span>
              </Link>
            </li>
          )
        })}
        <li className={classes.menuListProfile}>
          <MenuProfile
            name={name}
            image={image}
            email={user.email}
            role="Developer"
            onSignOut={onSignOut}
            onMyAccount={onMyAccount}
          />
        </li>
      </ul>
    </React.Fragment>
  )
}

export default MenuList
