import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { RegistrationForm } from '../'

describe('Testing Registration Form', () => {
  const testFunc = jest.fn()
  
  const RegistrationFormTestComponent = ({loading}: {loading: boolean}) => (
    <ThemeProvider theme={createMuiTheme({})}>
      <RegistrationForm loading={loading} onSubmit={testFunc} />
    </ThemeProvider>
  )
  const getComponent = (loading: boolean) => render(<RegistrationFormTestComponent loading={loading} />)

  
  it('Should render loader if loading prop true', () => {
    const {getByTestId} = getComponent(true)
    expect(getByTestId("loader-component")).toBeDefined()
  })

  it('Should NOT render loader if loading prop false', () => {
    const {getByTestId} = getComponent(false)
    expect(() => getByTestId("loader-component")).toThrow()
  })

  it('Should trigger onclick function', () => {
    const {getByTestId} = getComponent(false)
    const button = getByTestId('button-component')
    fireEvent.click(button)

    expect(testFunc).toBeCalled()
  })
})
