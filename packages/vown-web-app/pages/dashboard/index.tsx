import { IUserDetails } from '@vown/types'
import * as React from 'react'
import DashboardLayout from '../../components/layout/dashboard-layout'
import { COOKIE } from '../../types'
import { auth } from '../../utils'

const Dashboard = (props: { session: IUserDetails }) => {
  return (
    <DashboardLayout title="My Dashboard" session={props.session}>
      YOLO
    </DashboardLayout>
  )
}

Dashboard.getInitialProps = (ctx: any) => ({ session: ctx[COOKIE.token] })

export default auth.withAuth(Dashboard)
