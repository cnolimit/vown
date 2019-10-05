import { Button } from '@material-ui/core'
import { styled } from '@material-ui/styles'

const StyledButton = styled(Button)({
  width: '100%',
  height: '50px',
  color: 'white',
  padding: '13px 0',
  fontSize: '1em',
  fontWeight: 'bold',
  backgroundColor: '#4880FF',
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: '#85A8F9',
  },
})

export default StyledButton
