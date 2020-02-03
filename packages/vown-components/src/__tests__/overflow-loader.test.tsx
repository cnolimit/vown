import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import * as React from 'react'
import { OverflowLoader } from '../'

describe('Testing Overflow Loader', () => {
  const testMessage = 'Test Message'
  const blurTestId = 'blur-component'
  const loaderTestId = 'loader-component'
  const Content = () => <div>{testMessage}</div>
  const _OverflowLoader = (loading: boolean) => (
    <ThemeProvider theme={createMuiTheme({})}>
      <OverflowLoader loading={loading}>
        <Content />
      </OverflowLoader>
    </ThemeProvider>
  )

  it('Should render the blur component when loading true', () => {
    const { getByTestId } = render(_OverflowLoader(true))
    expect(getByTestId(blurTestId)).toBeDefined()
    expect(getByTestId(loaderTestId)).toBeDefined()
  })

  it('Should not render the blur component when loading false', () => {
    const { getByTestId } = render(_OverflowLoader(false))
    expect(() => getByTestId(blurTestId)).toThrow()
    expect(() => getByTestId(loaderTestId)).toThrow()
  })
})
