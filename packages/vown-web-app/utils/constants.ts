import DashboardIcon from '../static/assets/dashboard.svg'
import ReviewIcon from '../static/assets/reviews.svg'
import { NAVIGATION, ROUTES } from '../types'

// ----------------- Notification Timeout constants ------------------
export const NOTIFICATION_TIMEOUT = 3000

// ----------------- Animation constants ------------------
export const ANIMATION_DURATION = 0.3

export const zIndex = {
  lowest: 8,
  low: 16,
  high: 32,
  highest: 64,
}

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

export const LEARNING_RESOURCES = {
  javascript: {
    tags: [],
    resources: [
      {
        level: 'beginner',
        link:
          'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics',
        free: true,
        price: 0,
      },
      {
        level: 'beginner',
        link: 'https://www.codecademy.com/learn/introduction-to-javascript',
        free: true,
        price: 0,
      },

      {
        level: 'intermediate',
        link: 'https://htmldog.com/guides/javascript/intermediate/',
        free: true,
        price: 0,
      },
      {
        level: 'beginner',
        link: 'https://javascript30.com/',
        free: true,
        price: 0,
      },
    ],
  },
}

// interface post {
//   title: string
//   description: string
//   skills: string[]
//   posted_by: string
//   salary: number
//   term: 'PERMENENT' | 'CONTRACT'
// }

export default { NOTIFICATION_TIMEOUT }
