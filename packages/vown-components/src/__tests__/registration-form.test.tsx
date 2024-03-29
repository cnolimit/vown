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

  it('Should not trigger onclick function when fields are empty', () => {
    const {getByTestId} = getComponent(false)
    const button = getByTestId('button-component')
    fireEvent.click(button)

    expect(testFunc).toHaveBeenCalledTimes(0)
  })

  // TODO(phillip): Workout a way to test adding value to the text filed
  // to test the disabled button functionality.
  // it('Should not trigger onclick function when fields are empty', () => {
  //   const { getByLabelText, getByRole} = getComponent(false)
  //   const username = getByRole('input')
  //   console.log({username});
  //   expect(testFunc).toBeCalled()
  // })
})
