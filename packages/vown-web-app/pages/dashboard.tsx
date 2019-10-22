import * as React from 'react'
import { actions } from '../store'
import { withAuth } from '../utils/auth'
import { COOKIE } from '../utils/constants'
import { slideInOut } from '../utils/variants'
import { IUserDetails } from '@vown/types'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Button } from '@vown/components'
import Reviews from '../components/reviews/reviews.container'

const Container = styled.div`
  height: 100vh;
`

const Content = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: white;
  background-color: black;
  border: 2px solid black;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  padding: 50px;
  margin: 25px;
`

const Dashboard = (props: { session: IUserDetails }) => {
  return (
    <Container>
      <motion.div initial="exit" animate="enter" exit="exit">
        <motion.div variants={slideInOut}>
          <Content>
            <h4>Dashboard: USER: {props.session.email}</h4>
            <motion.div variants={slideInOut}>
              <Button onClick={actions.signOut}>SIGN OUT</Button>
            </motion.div>
          </Content>
        </motion.div>
      </motion.div>
      <Reviews />
    </Container>
  )
}

Dashboard.getInitialProps = (ctx: any) => ({ session: ctx[COOKIE.token] })

export default withAuth(Dashboard)
