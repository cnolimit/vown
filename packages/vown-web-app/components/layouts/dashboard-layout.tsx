import { CanduProvider } from '@candulabs/react-sdk'
import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { IUserDetails } from '@vown/types'
import NavBar from 'components/nav-bar'
import { motion } from 'framer-motion'
import React from 'react'
import { actions } from 'store'
import styled from 'styled-components'
import { variants } from 'utils'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`
const useStyles = makeStyles((theme: Theme) => ({
  body: {
    width: '100%',
    margin: '0 auto',
    maxWidth: `calc(991px + (${theme.typography.pxToRem(20)} * 2))`,
    padding: `${theme.typography.pxToRem(50)} ${theme.typography.pxToRem(20)}`,
  },
  bodyTitle: {
    lineHeight: '1.38',
    marginBottom: theme.typography.pxToRem(28),
  },
  bodyContent: {
    borderRadius: theme.shape.borderRadius,
    minHeight: theme.typography.pxToRem(250),
    position: 'relative',
    marginBottom: theme.typography.pxToRem(25),
    margin: '25px 0',
    height: '100%',
  },
}))

interface IDashboardLayout {
  title: string
  session: IUserDetails
  children: any
}

const DashboardLayout = ({ session, title, children }: IDashboardLayout) => {
  const classes = useStyles()
  return (
    <Container>
      <NavBar session={session} handleSignOut={actions.signOut} />
      <motion.div className={classes.body} initial="exit" animate="enter" exit="exit">
        <Typography className={classes.bodyTitle} variant="h1">
          {title}
        </Typography>
        <motion.section className={classes.bodyContent} variants={variants.slide}>
          <CanduProvider clientToken="vmDi4LBOdY" userId={session.uid}>
            {children}
          </CanduProvider>
        </motion.section>
      </motion.div>
    </Container>
  )
}

export default DashboardLayout
