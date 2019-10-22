import * as React from 'react'
import { Card, Typography, Link, FormControlLabel, Checkbox, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Button, OverflowLoader, Input } from '../'

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    boxShadow: 'none',
    backgroundColor: 'white',
  },
  wrapper: {
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  title: {
    margin: '50px 0 15px',
    textAlign: 'center',
    fontWeight: 600,
  },
  subtitle: {
    margin: '15px 0 50px',
    textAlign: 'center',
  },
  footerText: {
    margin: '15px 0 50px',
    textAlign: 'center',
  },
  input: {
    marginBottom: '35px',
  },
  checkbox: {
    marginRight: '5px !important',
  },
  label: {
    padding: '9px',
    marginTop: '-25px',
    marginBottom: '40px',
    color: 'rgba(0,0,0,0.54)',
  },
})

interface ILoginForm {
  onSubmit: Function
  loading: boolean
}

const LoginForm = ({ onSubmit, loading }: ILoginForm) => {
  const classes = useStyles()
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rememberPassword, setRememberPassword] = React.useState(false)

  const handleFormSubmit = () => onSubmit({ email, username, password, rememberPassword })

  return (
    <Card className={classes.container}>
      <OverflowLoader loading={loading}>
        <Container className={classes.wrapper}>
          <Typography variant="h5" className={classes.title}>
            Create an Account
          </Typography>
          <Typography variant="subtitle2" className={classes.subtitle}>
            Create and account to continue
          </Typography>

          <Input
            className={classes.input}
            fieldName="email"
            fieldValue={email}
            fieldLabel="Email address:"
            placeholder="cnolimit@gmail.com"
            onChange={(e: any) => setEmail(e.target.value)}
            type="email"
          />

          <Input
            className={classes.input}
            fieldName="username"
            fieldValue={username}
            fieldLabel="Username:"
            placeholder="cnolimit"
            onChange={(e: any) => setUsername(e.target.value)}
            type="text"
          />

          <Input
            className={classes.input}
            fieldName="passowrd"
            fieldValue={password}
            fieldLabel="Password:"
            placeholder="******"
            onChange={(e: any) => setPassword(e.target.value)}
            type="password"
          />
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
            label="I accept terms and conditions"
          />
          <Button onClick={handleFormSubmit}>Sign In</Button>
          <Typography variant="subtitle1" className={classes.footerText}>
            {`Already have an account?`} <Link href="/login">Login</Link>
          </Typography>
        </Container>
      </OverflowLoader>
    </Card>
  )
}

export default LoginForm
