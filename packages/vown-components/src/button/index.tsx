import { Button, Theme } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: '100%',
    height: '50px',
    color: 'white',
    padding: '13px 0',
    fontSize: '1em',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:disabled': {
      opacity: 0.5,
    },
  },
}))

interface IButton {
  children: any
}

const SButton = ({ children, ...restProps }: IButton & ButtonProps) => {
  const classes = useStyles()

  return (
    <Button
      {...restProps}
      data-testid={'button-component'}
      color="primary"
      className={classes.button}
    >
      {children}
    </Button>
  )
}
export default SButton
