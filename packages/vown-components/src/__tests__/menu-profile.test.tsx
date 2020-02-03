import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import { MenuProfile } from '../'
import DropdownMenu from '../menu-profile/dropdown-menu'

const testName = 'Test Name'
const testEmail = 'test@mail.com'
const testRole = 'Testing Role'
const testImage = 'test/image.jpg'
const testSignOut = jest.fn()
const testOnMyAccount = jest.fn()

describe('Testing Menu Profile Component', () => {
  const MenuProfileTestComponent = () => {
    return (
      <ThemeProvider theme={createMuiTheme({})}>
        <MenuProfile
          name={testName}
          role={testRole}
          image={testImage}
          email={testEmail}
          onSignOut={testSignOut}
          onMyAccount={testOnMyAccount}
        />
      </ThemeProvider>
    )
  }
  const getComponent = () => render(<MenuProfileTestComponent />)

  it('Should render the correct name', () => {
    const { getByTestId } = getComponent()
    const name = getByTestId('menu-profile-name')
    expect(name).toHaveTextContent(testName)
  })
  it('Should render the correct role', () => {
    const { getByTestId } = getComponent()
    const role = getByTestId('menu-profile-role')
    expect(role).toHaveTextContent(testRole)
  })
  it('Should render the correct image', () => {
    const { container } = getComponent()
    const image = container.querySelector('[data-testid="menu-profile-image"]')
    expect(image.getAttribute('style')).toContain(`background-image: url(${testImage})`)
  })
})

describe('Testing open dropdown menu', () => {
  const MenuProfileTestComponent = () => {
    return (
      <ThemeProvider theme={createMuiTheme({})}>
        <DropdownMenu
          name={testName}
          email={testEmail}
          onSignOut={testSignOut}
          onMyAccount={testOnMyAccount}
        />
      </ThemeProvider>
    )
  }
  const getComponent = () => render(<MenuProfileTestComponent />)
  it('Should render the correct name in the dropdown menu', () => {
    const { getByTestId } = getComponent()
    const dropdownName = getByTestId('menu-profile-dropdown-menu-name')
    expect(dropdownName).toHaveTextContent(testName)
  })
  it('Should render the correct email in the dropdown menu', () => {
    const { getByTestId } = getComponent()
    const dropdownEmail = getByTestId('menu-profile-dropdown-menu-email')
    expect(dropdownEmail).toHaveTextContent(testEmail)
  })
  it('Should render the account button', () => {
    const { getByTestId } = getComponent()
    const dropdownMyAccount = getByTestId('menu-profile-dropdown-menu-myaccount')
    dropdownMyAccount.click()

    expect(testOnMyAccount).toHaveBeenCalled()
  })
  it('Should call the signout function wehn clicked', () => {
    const { getByTestId } = getComponent()
    const dropdownSignOut = getByTestId('menu-profile-dropdown-menu-signout')
    dropdownSignOut.click()

    expect(testSignOut).toHaveBeenCalled()
  })
})
