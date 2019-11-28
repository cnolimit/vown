import DashboardIcon from '../static/assets/dashboard.svg'
import ReviewIcon from '../static/assets/reviews.svg'
import { NAVIGATION, ROUTES } from '../types'

// ----------------- Notification Timeout constants ------------------
export const NOTIFICATION_TIMEOUT = 5000

export const NAVIGATION_LIST: NAVIGATION = [
  {
    link: ROUTES.dashboard,
    text: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    link: ROUTES.reviews,
    text: 'Reviews',
    icon: ReviewIcon,
  },
]

export default { NOTIFICATION_TIMEOUT }
