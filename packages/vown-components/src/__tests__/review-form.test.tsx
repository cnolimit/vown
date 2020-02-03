import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { ReviewForm } from '../'

describe('Testing Review Form', () => {
  const handleSubmit = jest.fn((review) => review)
  const getComponent = () => render(
    <ThemeProvider theme={createMuiTheme({})}>
      <ReviewForm onSubmit={handleSubmit} />
    </ThemeProvider>
  )

  it('Should ', () => {
    const reviewObject = {
      rating: 2,
      recommends: false,
      user_id: '',
      title: 'New Review Title',
      description: 'New Review Description',
      difficulty_rating: 0,
      experience_rating: 0,
      approve_of_landlord: false,
      landlord_id: '9dd53577-b9aa-4024-beaa-1a38d3bba38b' 
    }

    const { getByTestId, container } = getComponent()
    const submitButton = getByTestId('button-component')
    const inputStars = container.querySelector('#overall-rating-2')
    const inputTitle = getByTestId('Title-input-component').firstElementChild
    const inputDescription = getByTestId('Review-multiline-input-component').firstElementChild
    
    fireEvent.change(inputTitle as Element, { target: { value: "New Review Title" } })
    fireEvent.change(inputDescription as Element, { target: { value: "New Review Description" } })
    fireEvent.click(inputStars as Element)
    fireEvent.click(submitButton)
    
    expect(handleSubmit).toBeCalledWith(reviewObject)
  })
})
