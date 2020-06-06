import { InputBase, InputBaseProps, InputLabel } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    width: '100%',
    color: '#000',
    height: '45px',
    fontSize: '1em',
    paddingTop: '2px',
    marginTop: '10px',
    paddingLeft: '15px',
    backgroundColor: '#F1F4F9',
    border: '1px solid #D8D8D8',
    borderRadius: theme.shape.borderRadius,
  },
  disabled: {
    padding: 0,
    opacity: 1,
    margin: 0,
    border: 0,
    background: 'none',
  },
}))

interface IInput {
  fieldName: string
  fieldValue: string
  fieldLabel: string
  disabled?: boolean
}

const Input = ({
  fieldName,
  fieldValue,
  fieldLabel,
  placeholder,
  onChange,
  className,
  disabled,
  ...restProps
}: IInput & InputBaseProps) => {
  const classes = useStyles()

  return (
    <div className={className}>
      <InputLabel data-testid={`${fieldLabel}-input-label-component`} htmlFor={fieldName}>
        {fieldLabel}
      </InputLabel>
      <InputBase
        {...restProps}
        id={fieldName}
        value={fieldValue}
        onChange={onChange}
        disabled={disabled}
        className={`${classes.input} ${disabled && classes.disabled}`}
        placeholder={placeholder}
        data-testid={`${fieldLabel}-input-component`}
      />
    </div>
  )
}

export default Input
