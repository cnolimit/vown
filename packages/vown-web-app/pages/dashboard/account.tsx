import { AccountDetailsCard } from '@vown/components'
import { IUserDetails, IUserProfileDetails } from '@vown/types'
import DashboardLayout from 'components/layouts/dashboard-layout'
import * as React from 'react'
import { actions } from 'store'
import { COOKIE } from 'types'
import { auth } from 'utils'

const Account = (props: { session: IUserDetails }) => {
  const AccountSub = (data: IUserProfileDetails) => {
    actions.updateUserDetails(data)
  }

  return (
    <DashboardLayout title="My Account" session={props.session}>
      <AccountDetailsCard loading={false} onSubmit={AccountSub} />
    </DashboardLayout>
  )
}

Account.getInitialProps = (ctx: any) => ({ session: ctx[COOKIE.token] })

export default auth.withAuth(Account)
