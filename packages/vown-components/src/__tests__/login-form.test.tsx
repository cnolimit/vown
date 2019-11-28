import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { LoginForm } from '../';
describe('Testing Login Form', () => {
  const testFunc = jest.fn()
  
  const LoginFormTestComponent = ({loading}: {loading: boolean}) => {
    return (
      <ThemeProvider theme={createMuiTheme({})}>
        <LoginForm loading={loading} onSubmit={testFunc} />
      </ThemeProvider>
    )
  }
  const getComponent = (loading: boolean) => render(<LoginFormTestComponent loading={loading} />)

  it('Should render loader if loading prop true', () => {
    const { getByTestId } = getComponent(true)
    expect(getByTestId("loader-component")).toBeDefined()
  })

  it('Should NOT render loader if loading prop false', () => {
    const { getByTestId } = getComponent(false)
    expect(() => getByTestId("loader-component")).toThrow()
  })

  it('Should trigger onclick function', () => {
    const { getByTestId } = getComponent(false)
    const form = getByTestId("login-form-component")
    fireEvent.submit(form)

    expect(testFunc).toHaveBeenCalled()
  })
})
