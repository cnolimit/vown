import { Card, Checkbox, FormControlLabel, Link, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as React from 'react'
import { Button, Input, OverflowLoader } from '../'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.paper,
  },
  wrapper: {
    paddingLeft: theme.typography.pxToRem(50),
    paddingRight: theme.typography.pxToRem(50),
  },
  title: {
    margin: `${theme.typography.pxToRem(50)} 0 ${theme.typography.pxToRem(15)}`,
    textAlign: 'center',
    fontWeight: 600,
  },
  subtitle: {
    margin: `${theme.typography.pxToRem(15)} 0 ${theme.typography.pxToRem(50)}`,
    textAlign: 'center',
  },
  footerText: {
    margin: `${theme.typography.pxToRem(15)} 0 ${theme.typography.pxToRem(50)}`,
    textAlign: 'center',
  },
  input: {
    marginBottom: theme.typography.pxToRem(35),
  },
  checkbox: {
    marginRight: `${theme.typography.pxToRem(5)} !important`,
  },
  label: {
    padding: `${theme.typography.pxToRem(9)} 0`,
    marginTop: `-${theme.typography.pxToRem(25)}`,
    marginBottom: theme.typography.pxToRem(40),
    color: 'rgba(0,0,0,0.54)',
  },
  span: {
    display: 'block',
    cursor: 'pointer',
    textAlign: 'right',
    fontSize: theme.typography.pxToRem(12),
    marginTop: `-${theme.typography.pxToRem(30)}`,
    marginBottom: theme.typography.pxToRem(20),
    color: theme.palette.secondary.main,
  },
}))

interface ILoginForm {
  onSubmit: Function
  resetCache: () => void
  cachedUser: string
  loading: boolean
}

const LoginForm = ({ onSubmit, loading, cachedUser, resetCache }: ILoginForm) => {
  const classes = useStyles()
  const [username, setUsername] = React.useState(cachedUser || '')
  const [password, setPassword] = React.useState('')
  const [rememberPassword, setRememberPassword] = React.useState(false)

  React.useEffect(() => setUsername(cachedUser), [cachedUser])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ username, password, rememberPassword })
  }

  return (
    <Card className={classes.container}>
      <OverflowLoader loading={loading}>
        <form
          className={classes.wrapper}
          onSubmit={handleFormSubmit}
          data-testid="login-form-component"
        >
          <Typography variant="h5" className={classes.title}>
            Login to Account
          </Typography>
          <Typography variant="subtitle2" className={classes.subtitle}>
            Please enter your email and password to continue
          </Typography>
          <Input
            autoComplete="on"
            className={classes.input}
            fieldName="username"
            fieldValue={cachedUser || username}
            fieldLabel="Email address:"
            placeholder={cachedUser || 'example@gmail.com'}
            onChange={(e: any) => setUsername(e.target.value)}
            type="text"
            disabled={!!cachedUser}
          />
          <Input
            autoComplete="on"
            className={classes.input}
            fieldName="passowrd"
            fieldValue={password}
            fieldLabel="Password:"
            placeholder="******"
            onChange={(e: any) => setPassword(e.target.value)}
            type="password"
          />
          {cachedUser ? (
            <Typography component="span" className={classes.span} onClick={resetCache}>
              Not you?
            </Typography>
          ) : (
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  className={classes.checkbox}
                  checked={rememberPassword}
                  onChange={() => setRememberPassword(!rememberPassword)}
                  color="primary"
                />
              }
              label="Remember me"
            />
          )}
          <Button type="submit">Sign In</Button>
          <Typography variant="subtitle1" className={classes.footerText}>
            {`Don't have an account?`}{' '}
            <Link href="/register" color="secondary">
              <strong>Create Account</strong>
            </Link>
          </Typography>
        </form>
      </OverflowLoader>
    </Card>
  )
}

export default LoginForm
