import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { ERRORS, NOTIFICATION_STATES } from '@vown/types'
import React from 'react'
import { Notification } from '../'


describe('Testing Notification', () => {
  const notifications = [
    {id: 'notification-type-ERROR', type: NOTIFICATION_STATES.ERROR},
    {id: 'notification-type-SUCCESS', type: NOTIFICATION_STATES.SUCCESS},
    {id: 'notification-type-INFO', type: NOTIFICATION_STATES.INFO}
  ]

  notifications.forEach((n) => {
    it(`Should render 1 ${n.type} notification`, () => {
      const notification = {
        id: 1,
        type: n.type,
        message: ERRORS.UNEXPECTED
      }
      const { getByTestId } = render(<Notification notifications={[notification]} />)
      expect(getByTestId(n.id)).toBeDefined()
    })
  })

  it('Should not render any notification if array empty', () => {
    const { container } = render(<Notification notifications={[]} />)
    const containerDiv = container.getElementsByTagName('div')
    expect(containerDiv.length).toBe(0)
  })

  it('Should render 1 notification', () => {
    const { container } = render(<Notification notifications={[{
      id: 1,
      type: NOTIFICATION_STATES.ERROR,
      message: ERRORS.UNEXPECTED
    }]} />)
    
    const containerDiv = container.getElementsByTagName('div')
    expect(containerDiv.length).toBe(1)
  })

  it('Should render 2 notification', () => {
    const notifications = [
      {
      id: 1,
      type: NOTIFICATION_STATES.ERROR,
      message: ERRORS.UNEXPECTED
    },
    {
      id: 2,
      type: NOTIFICATION_STATES.ERROR,
      message: ERRORS.UNEXPECTED
    }
  ]
    const { container } = render(<Notification notifications={notifications} />)
    
    const containerDiv = container.getElementsByTagName('div')
    expect(containerDiv.length).toBe(2)
  })
})
