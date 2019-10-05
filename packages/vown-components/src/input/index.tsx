import React from 'react'
import { InputBase, InputLabel } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

const StyledInputBase = styled(InputBase)({
  width: '100%',
  paddingLeft: '15px',
  paddingTop: '2px',
  height: '45px',
  color: '#A6A6A6',
  marginTop: '10px',
  backgroundColor: '#F1F4F9',
  fontSize: '1em',
  borderRadius: '5px',
  border: '1px solid #D8D8D8',
})

interface IInput {
  fieldName: string
  fieldValue: string
  fieldLabel: string
  placeholder: string
  onChange: (e: any) => void
  type: string
  className: string
}

const Input = ({
  fieldName,
  fieldValue,
  fieldLabel,
  placeholder,
  onChange,
  ...restProps
}: IInput) => (
  <React.Fragment>
    <InputLabel htmlFor={fieldName}>{fieldLabel}</InputLabel>
    <StyledInputBase
      {...restProps}
      id={fieldName}
      value={fieldValue}
      placeholder={placeholder}
      inputProps={{ 'aria-label': 'search google maps' }}
      onChange={onChange}
    />
  </React.Fragment>
)

export default Input
