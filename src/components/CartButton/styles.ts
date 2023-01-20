import { styled } from '../../styles'

export const HandBagContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '3rem',
  height: '3rem',

  background: '$gray800',
  color: '$gray300',
  borderRadius: '6px',

  border: 'none',

  cursor: 'pointer',

  span: {
    position: 'absolute',
    top: '1.25rem',
    right: '4.3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '2rem',
    height: '2rem',

    background: '$green400',
    color: '$white',
    border: '3px solid',
    borderColor: '$gray900',
    borderRadius: '100%',
  },
})
