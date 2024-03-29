import { Notification } from '@vown/components'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import { state } from 'store'
import styled from 'styled-components'
import { ANIMATION_DURATION, zIndex } from 'utils/constants'

const NotificationWrapper = styled(motion.div)`
  left: 0;
  right: 0;
  width: 100%;
  margin-left: 0;
  overflow: hidden;
  border-radius: 0;
  z-index: ${zIndex.highest};
  @media (min-width: 768px) {
    top: 15px;
    left: 50%;
    width: 500px;
    border-radius: 5px;
    margin-left: -250px;
    position: absolute;
  }
`

const Container = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  letter-spacing: 0;
  background-color: #f5f5f5;
  * {
    box-sizing: border-box;
    font-family: 'Nunito Sans', sans-serif !important;
  }
  @media (min-width: 768px) {
    display: flex;
    padding: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

const Layout = ({ children }: { children: any }) => {
  const notificationsExists = Boolean(state.notification.length)
  return (
    <div style={{ position: 'relative' }}>
      <Head>
        <title>{`Veriown | Search, Rent & Review Properties Online`}</title>
      </Head>
      {notificationsExists ? (
        <NotificationWrapper animate={{ y: 20, transition: { duration: ANIMATION_DURATION } }}>
          <Notification notifications={state.notification} />
        </NotificationWrapper>
      ) : null}
      <Container>
        <div style={{ width: '100%' }}>{children}</div>
      </Container>
    </div>
  )
}

export default observer(Layout)
