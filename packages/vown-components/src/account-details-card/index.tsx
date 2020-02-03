import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { FormEvent } from 'react'
import { Button, Input, OverflowLoader } from '..'
import CameraIcon from './camera-icon'
import { IUserProfileDetails } from '@vown/types'

const useStyles = makeStyles(({ typography: { pxToRem }, palette, shape }: Theme) => ({
  accountContainer: {
    width: '100%',
    display: 'grid',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: palette.background.paper,
    border: '2px solid #F0F0F2',
    gridTemplateRows: `${pxToRem(100)} ${pxToRem(150)} ${pxToRem(100)}`,
    height: pxToRem(450),
    maxWidth: pxToRem(991),
    borderRadius: shape.borderRadius,
    padding: `${pxToRem(50)} 0`,
  },
  accountItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountItemFields: {
    display: 'grid',
    gridGap: pxToRem(50),
    gridTemplateRows: `${pxToRem(70)}`,
    gridTemplateColumns: `${pxToRem(300)} ${pxToRem(300)}`,
  },
  accountItemButonWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  accountItemButon: {
    width: '250px',
  },
  accountItemImage: {
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEE',
    width: pxToRem(80),
    height: pxToRem(80),
  },
  accountItemImageUploadCaption: {
    margin: '0',
    width: '80px',
    fontWeight: 500,
    textAlign: 'center',
    color: 'rgb(51, 103, 171)',
    marginTop: pxToRem(10),
    fontSize: pxToRem(12),
  },
}))

interface IAccountDetailsCardProps {
  onSubmit: (userData: IUserProfileDetails) => void
  loading: boolean
}

const AccountDetailsCard = ({ onSubmit, loading }: IAccountDetailsCardProps) => {
  const classes = useStyles()
  const [firstName, setFirstname] = React.useState('')
  const [lastName, setLastname] = React.useState('')

  const clearFields = () => {
    setFirstname('')
    setLastname('')
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      firstName,
      lastName,
      photo: '', //TODO: setup photo options to select from instead of uploads
    })
    clearFields()
  }

  return (
    <div style={{ position: 'relative' }}>
      <OverflowLoader loading={loading}>
        <form onSubmit={handleFormSubmit} className={classes.accountContainer}>
          <div className={classes.accountItem}>
            <div>
              <div className={classes.accountItemImage}>
                <CameraIcon />
              </div>
              <h6 className={classes.accountItemImageUploadCaption}>Upload Photo</h6>
            </div>
          </div>
          <div className={classes.accountItem}>
            <div className={classes.accountItemFields}>
              <Input
                autoComplete="on"
                fieldName="firstname"
                fieldValue={firstName}
                fieldLabel="First Name"
                placeholder="Enter your first name"
                onChange={(e: any) => setFirstname(e.target.value)}
                type="text"
              />
              <Input
                autoComplete="on"
                fieldName="lastname"
                fieldValue={lastName}
                fieldLabel="Last Name"
                placeholder="Enter your last name"
                onChange={(e: any) => setLastname(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className={classes.accountItemButonWrapper}>
            <div className={classes.accountItemButon}>
              <Button type="submit">Update Details</Button>
            </div>
          </div>
        </form>
      </OverflowLoader>
    </div>
  )
}

export default AccountDetailsCard
