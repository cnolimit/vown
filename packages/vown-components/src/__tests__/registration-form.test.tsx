import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { RegistrationForm } from '../'

describe('Testing Registration Form', () => {
  
  it('Should render loader if loading prop true', () => {
    const {getByTestId} = render(<RegistrationForm loading={true} onSubmit={() => {}} />)
    expect(getByTestId("loader-component")).toBeDefined()
  })

  it('Should NOT render loader if loading prop false', () => {
    const {getByTestId} = render(<RegistrationForm loading={false} onSubmit={() => {}} />)
    expect(() => getByTestId("loader-component")).toThrow()
  })

  it('Should trigger onclick function', () => {
    const testFunc = jest.fn()
    const {getByTestId} = render(<RegistrationForm loading={false} onSubmit={testFunc} />)
    const button = getByTestId('button-component')
    fireEvent.click(button)

    expect(testFunc).toBeCalled()
  })
})
