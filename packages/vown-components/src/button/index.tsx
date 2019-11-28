import { Button } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles({
  button: {
    width: '100%',
    height: '50px',
    color: 'white',
    padding: '13px 0',
    fontSize: '1em',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    borderRadius: '8px',
    backgroundColor: 'rgb(95, 37, 159)',
    '&:hover': {
      backgroundColor: 'rgba(95, 37, 159, 0.8)',
    },
    '&:disabled': {
      backgroundColor: 'rgba(95, 37, 159, 0.5)',
    },
  },
})

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
