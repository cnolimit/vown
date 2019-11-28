import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import { ReviewCard } from '../'


describe('Testing Review Card', () => {
  const reviewIds = {
    rating:"review-card-rating",
    title:"review-card-title",
    date:"review-card-date",
    description:"review-card-description"
}
  const title = "Testing Review"
  const rating = 2
  const date = "2019-10-31T19:54:20"
  const description = "Test review description"
  const getComponent = () => render(<ReviewCard title={title} rating={rating} description={description} date={date} />)

  it('Should render review card components', () => {
  const {getByTestId} = getComponent()
  Object.values(reviewIds).forEach((id) => {
      expect(getByTestId(id)).toBeDefined()
    })
  })

  it("Should render 2 stars", () => {
    const {getByTestId} = getComponent()
    const ratingComponent = getByTestId(reviewIds.rating)
    expect(ratingComponent.getAttribute("aria-label")).toBe("2 Stars")
  })

  it("Should render title text correctly formatted", () => {
    const {getByTestId} = getComponent()
    expect(getByTestId(reviewIds.title)).toHaveTextContent(title.toLowerCase())
  })

  it("Should render date text correctly formatted", () => {
    const {getByTestId} = getComponent()
    expect(getByTestId(reviewIds.date)).toHaveTextContent(date)
  })
  it("Should render description text correctly formatted", () => {
    const {getByTestId} = getComponent()
    expect(getByTestId(reviewIds.description)).toHaveTextContent(description)
  })
})
