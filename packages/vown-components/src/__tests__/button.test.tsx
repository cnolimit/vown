import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React, { useState } from 'react'
import { Button } from '../'

describe('Testing Button', () => {
  const testMessage = 'Test Message'
  const testMessage2 = 'Testing Message value 2'
  const ButtonTestComponent = () => {
    const [message, setMessage] = useState(testMessage)
    return (
      <ThemeProvider theme={createMuiTheme({})}>
        <Button onClick={() => setMessage(testMessage2)}>{message}</Button>
      </ThemeProvider>
    )
  }
  const getComponent = () => render(<ButtonTestComponent />)
  
  it('Should render the text in the button', () => {
    const { getByTestId } = getComponent()
    const button = getByTestId('button-component')
    expect(button).toHaveTextContent(testMessage)
  })

  it('Should trigger the onclick function', () => {
    const { getByTestId } = getComponent()
    const button = getByTestId('button-component')
    fireEvent.click(button)
    
    expect(button).toHaveTextContent(testMessage2)
  })
})
