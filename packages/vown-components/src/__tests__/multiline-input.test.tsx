import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React, { useState } from 'react'
import { MultilineInput } from '../'


describe('Testing Multiline Input', () => {
  const fieldName = 'Test Name'
  const fieldValue = 'Test Value'
  const fieldLabel = 'Test Label'
  const inputTestId = `${fieldLabel}-multiline-input-component`
  const inputLabelTestId = `${fieldLabel}-multiline-input-label-component`

  const InputTestComponent = () => {
    const [value, setValue] = useState(fieldValue)
    return (
      <MultilineInput 
      fieldName={fieldName}
      fieldValue={value}
      fieldLabel={fieldLabel}
      onChange={(e:any) => setValue(e.target.value)}
    />
    )
  }
  
  const getComponent = () =>{
    const utils = render(<InputTestComponent />)
    const input = utils.container.getElementsByTagName('textarea')[0]
    return { input, ...utils }
  } 

  it('Should render the input component', () => {
    const { getByTestId } = getComponent()
    expect(getByTestId(inputTestId)).toBeDefined()
    expect(getByTestId(inputLabelTestId)).toBeDefined()
  })

  it('Should render the field label text', () => {
    const { queryByText } = getComponent()
    expect(queryByText(fieldLabel)).toHaveTextContent(fieldLabel)
  })

  it('Should render the field label related to the input field name', () => {
    const { getByTestId } = getComponent()
    const label = getByTestId(inputLabelTestId)
    
    expect(label.getAttribute('for')).toBe(fieldName)
  })

  it('Should render the input value', () => {
    const {  getByTestId } = getComponent()
    const input = getByTestId(inputTestId).innerHTML
      
    expect(input.indexOf(fieldValue)).toBeGreaterThan(-1)
  })

  it('Should update the input value', () => {
    const { input } = getComponent()
    const newFieldValue = "Test Value 2"
    fireEvent.change(input, { target: { value: newFieldValue } })

    expect(input.value).toBe(newFieldValue)
  })
})
