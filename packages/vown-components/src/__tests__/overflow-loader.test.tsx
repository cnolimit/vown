import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { OverflowLoader } from '../'

describe('Testing Overflow Loader', () => {
  const testMessage = 'Test Message'
  const blurTestId = 'blur-component'
  const loaderTestId = 'loader-component'
  const Content = () => <div>{testMessage}</div>

  it('Should render the blur component when loading true', () => {
    const { getByTestId } = render(
      <OverflowLoader loading={true}>
        <Content />
      </OverflowLoader>
    )
    // @ts-ignore
    expect(getByTestId(blurTestId)).toBeDefined()
    // @ts-ignore
    expect(getByTestId(loaderTestId)).toBeDefined()
  })

  it('Should not render the blur component when loading false', () => {
    const { getByTestId } = render(
      <OverflowLoader loading={false}>
        <Content />
      </OverflowLoader>
    )
    // @ts-ignore
    expect(() => getByTestId(blurTestId)).toThrow()
    // @ts-ignore
    expect(() => getByTestId(loaderTestId)).toThrow()
  })
})
