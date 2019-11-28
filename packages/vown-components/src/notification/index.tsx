import Close from '@material-ui/icons/Close'
import Done from '@material-ui/icons/Done'
import Info from '@material-ui/icons/Info'
import { INotification, NOTIFICATION_STATES } from '@vown/types'
import React from 'react'
import styled from 'styled-components'

const Icon = {
  [NOTIFICATION_STATES.ERROR]: Close,
  [NOTIFICATION_STATES.INFO]: Info,
  [NOTIFICATION_STATES.SUCCESS]: Done,
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 1.3em;
  position: relative;
  text-align: center;
  ${(props: { type: NOTIFICATION_STATES }) => {
    if (props.type === NOTIFICATION_STATES.ERROR) {
      return `
        color: #ef3826;
        background-color: #f4d7d3;
        border-bottom: 2px solid #ef3826;
      `
    }
    if (props.type === NOTIFICATION_STATES.SUCCESS) {
      return `
        color: #00B69B;
        background-color: #CCF0EB;
        border-bottom: 2px solid #00B69B;
      `
    }
    if (props.type === NOTIFICATION_STATES.INFO) {
      return `
        color: #5A8CFF;
        background-color: #DEE8FF;
        border-bottom: 2px solid #5A8CFF;
      `
    }
    return
  }}
`

const StyledIcon = (type: NOTIFICATION_STATES) => styled(Icon[type])`
  left: 25px;
  padding: 2px;
  position: absolute;
  border-radius: 50%;
  border: 2px solid
    ${() => {
      if (type === NOTIFICATION_STATES.ERROR) return '#ef3826;'
      if (type === NOTIFICATION_STATES.SUCCESS) return '#00B69B;'
      if (type === NOTIFICATION_STATES.INFO) return '#5A8CFF;'
      return ''
    }};
`

interface INotificationProps {
  notifications: INotification[]
}

const Notification = (props: INotificationProps) => {
  return (
    <React.Fragment>
      {props.notifications.map(notification => {
        const NotificationIcon = StyledIcon(notification.type)
        return (
          <Container
            data-testid={`notification-component-${notification.id}`}
            key={notification.id}
            type={notification.type}
          >
            <NotificationIcon
              data-testid={`notification-type-${notification.type}`}
              style={{ fontSize: '1.4em', marginRight: '25px' }}
            />
            <strong>{notification.message}</strong>
          </Container>
        )
      })}
    </React.Fragment>
  )
}

export default Notification
