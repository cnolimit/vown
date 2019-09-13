import React from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

const Container = styled.div`
  z-index: 5;
  width: 100%;
  height: 100%;
  display: grid;
  position: absolute;
  align-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
`

const Blur = styled.div`
  filter: blur(2px);
`

interface IOverflowLoader {
  loading: boolean
  children: React.ReactNode
}

const OverflowLoader = (props: IOverflowLoader) => {
  return (
    <React.Fragment>
      {props.loading ? (
        <Container>
          <CircularProgress size={60} thickness={4.5} />
        </Container>
      ) : null}
      {props.loading ? <Blur>{props.children}</Blur> : props.children}
    </React.Fragment>
  )
}

export default OverflowLoader
