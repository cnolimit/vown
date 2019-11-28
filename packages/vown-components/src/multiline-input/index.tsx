import { InputBase, InputLabel } from '@material-ui/core'
import { InputBaseProps } from '@material-ui/core/InputBase'
import { styled } from '@material-ui/core/styles'
import * as React from 'react'

const StyledInputBase = styled(InputBase)({
  width: '100%',
  padding: '15px',
  height: '150px',
  color: '#000',
  marginTop: '10px',
  backgroundColor: '#F1F4F9',
  fontSize: '1.2em',
  borderRadius: '8px',
  border: '1px solid #D8D8D8',
})

interface IInput {
  fieldName: string
  fieldValue: string
  fieldLabel: string
  onChange: (e: any) => void
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
    <InputLabel data-testid={`${fieldLabel}-multiline-input-label-component`} htmlFor={fieldName}>
      {fieldLabel}
    </InputLabel>
    <StyledInputBase
      {...restProps}
      multiline
      rows="6"
      id={fieldName}
      value={fieldValue}
      placeholder={placeholder}
      onChange={onChange}
      data-testid={`${fieldLabel}-multiline-input-component`}
    />
  </div>
)

export default Input
