import DashboardIcon from '../static/assets/dashboard.svg'
import ReviewIcon from '../static/assets/reviews.svg'
import { NAVIGATION, ROUTES } from '../types'

// ----------------- Notification Timeout constants ------------------
export const NOTIFICATION_TIMEOUT = 3000

// ----------------- Animation constants ------------------
export const ANIMATION_DURATION = 0.3

export const zIndex = { lowest: 8, low: 16, high: 32, highest: 64 }

export const NAVIGATION_LIST: NAVIGATION = [
  {
    link: ROUTES.dashboard,
    text: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    link: ROUTES.dashboard_reviews,
    text: 'Reviews',
    icon: ReviewIcon,
  },
]

export default { NOTIFICATION_TIMEOUT }
