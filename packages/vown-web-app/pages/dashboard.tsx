import { AppBar, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { IUserDetails } from '@vown/types'
import { motion } from 'framer-motion'
import * as React from 'react'
import styled from 'styled-components'
import MenuList from '../components/menu-list'
import ReviewList from '../components/reviews/reviews-list'
import Logo from '../static/assets/logo_hori.svg'
import { actions } from '../store'
import { COOKIE } from '../types'
import { auth, variants } from '../utils'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`

const useStyles = makeStyles((theme: Theme) => ({
  bar: {
    width: '100%',
    color: 'black',
    display: 'flex',
    boxShadow: 'none',
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    border: '1px solid rgba(232,232,232,0.2)',
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
  barButton: {
    flexGrow: 1,
    maxWidth: '200px',
  },
  body: {
    width: '100%',
    margin: '0 auto',
    maxWidth: `calc(990px + (${theme.typography.pxToRem(20)} * 2))`,
    padding: `${theme.typography.pxToRem(50)} ${theme.typography.pxToRem(20)}`,
  },
  bodyTitle: {
    lineHeight: '1.38',
    marginBottom: theme.typography.pxToRem(28),
  },
  bodyContent: {
    borderRadius: theme.typography.pxToRem(10),
    minHeight: theme.typography.pxToRem(250),
    position: 'relative',
    marginBottom: theme.typography.pxToRem(25),
  },
}))

const Dashboard = (props: { session: IUserDetails }) => {
  const classes = useStyles()

  return (
    <Container>
      <AppBar className={classes.bar}>
        <div className={classes.barContent}>
          <Logo />
          <MenuList user={props.session} onSignOut={actions.signOut} />
        </div>
      </AppBar>
      <motion.div className={classes.body} initial="exit" animate="enter" exit="exit">
        <Typography className={classes.bodyTitle} variant="h1">
          My Reviews
        </Typography>
        <motion.section className={classes.bodyContent} variants={variants.slideInOut}>
          <ReviewList />
        </motion.section>
      </motion.div>
    </Container>
  )
}

Dashboard.getInitialProps = (ctx: any) => ({ session: ctx[COOKIE.token] })

export default auth.withAuth(Dashboard)
