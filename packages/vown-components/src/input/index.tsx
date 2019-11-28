import { InputBase, InputLabel } from '@material-ui/core'
import { InputBaseProps } from '@material-ui/core/InputBase'
import { styled } from '@material-ui/core/styles'
import * as React from 'react'

const StyledInputBase = styled(InputBase)({
  width: '100%',
  paddingLeft: '15px',
  paddingTop: '2px',
  height: '45px',
  color: '#000',
  marginTop: '10px',
  backgroundColor: '#F1F4F9',
  fontSize: '1em',
  borderRadius: '8px',
  border: '1px solid #D8D8D8',
})

interface IInput {
  fieldName: string
  fieldValue: string
  fieldLabel: string
}

const Input = ({
  fieldName,
  fieldValue,
  fieldLabel,
  placeholder,
  onChange,
  className,
  ...restProps
}: IInput & InputBaseProps) => (
  <div className={className}>
    <InputLabel data-testid={`${fieldLabel}-input-label-component`} htmlFor={fieldName}>
      {fieldLabel}
    </InputLabel>
    <StyledInputBase
      {...restProps}
      id={fieldName}
      value={fieldValue}
      placeholder={placeholder}
      onChange={onChange}
      data-testid={`${fieldLabel}-input-component`}
    />
  </div>
)

export default Input
