import { AppBar, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { IUserDetails } from '@vown/types'
import { useRouter } from 'next/router'
import React from 'react'
import Logo from 'static/assets/logo_hori.svg'
import { ROUTES } from 'types'
import MenuList from './menu-list'

const useStyles = makeStyles((theme: Theme) => ({
  bar: {
    width: '100%',
    color: 'black',
    display: 'flex',
    boxShadow: 'none',
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #ddd',
    backgroundColor: theme.palette.background.paper,
  },
  barContent: {
    width: '100%',
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: `calc(991px + (${theme.typography.pxToRem(20)} * 2))`,
    padding: `${theme.typography.pxToRem(24)} ${theme.typography.pxToRem(20)}`,
  },
}))

interface INavBar {
  session: IUserDetails
  handleSignOut: () => void
}

const NavBar = ({ session, handleSignOut }: INavBar) => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <AppBar className={classes.bar}>
      <div className={classes.barContent}>
        <Logo />
        <MenuList
          user={session}
          onSignOut={handleSignOut}
          onMyAccount={() => router.push(ROUTES.dashboard_account)}
        />
      </div>
    </AppBar>
  )
}

export default NavBar
