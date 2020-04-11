import { IUserDetails } from '@vown/types'
import { DashboardLayout } from 'components/layouts'
import * as React from 'react'
import { COOKIE } from 'types'
import { auth } from 'utils'

const Dashboard = (props: { session: IUserDetails }) => {
  return (
    <DashboardLayout title="My Dashboard" session={props.session}>
      YOLO
    </DashboardLayout>
  )
}

Dashboard.getInitialProps = (ctx: any) => ({ session: ctx[COOKIE.token] })

export default auth.withAuth(Dashboard)
