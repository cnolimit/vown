import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Button } from '../'

describe('Testing Button', () => {
  const testMessage = 'Test Message'
  const { queryByText } = render(<Button>{testMessage}</Button>)

  it('Should render the text in the button', () => {
    // @ts-ignore
    expect(queryByText(testMessage)).toHaveTextContent(testMessage)
  })
})
