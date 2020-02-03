import { ReviewForm } from '@vown/components'
import { IUserDetails } from '@vown/types'
import * as React from 'react'
import DashboardLayout from '../../components/layout/dashboard-layout'
import ReviewList from '../../components/reviews/reviews-list'
import { actions } from '../../store'
import { COOKIE } from '../../types'
import { auth } from '../../utils'

const Reviews = (props: { session: IUserDetails }) => {
  return (
    <DashboardLayout title="My Reviews" session={props.session}>
      <ReviewList />
      <ReviewForm onSubmit={actions.createReview} />
    </DashboardLayout>
  )
}

Reviews.getInitialProps = (ctx: any) => ({ session: ctx[COOKIE.token] })

export default auth.withAuth(Reviews)
