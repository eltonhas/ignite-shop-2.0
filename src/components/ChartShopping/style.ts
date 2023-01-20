import { styled } from '../../styles'
import * as Dialog from '@radix-ui/react-dialog'

export const Content = styled(Dialog.Content, {
  width: '32rem',
  height: '100vh',
  padding: '2.5rem 3rem',
  background: '$gray800',

  position: 'fixed',
  top: '0',
  right: '0',

  paddingTop: '4.5rem',
  paddingBottom: '4.5rem',
  paddingLeft: '3rem',
  paddingRight: '3rem',

  footer: {
    position: 'fixed',
    bottom: '1rem',

    width: '26rem',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3.5rem',
  },
})

export const Close = styled(Dialog.Close, {
  position: 'absolute',
  right: '1.5rem',
  top: '1.5rem',
  background: 'none',
  border: 'none',
  color: '$gray400',

  cursor: 'pointer',
})

export const Title = styled(Dialog.Title, {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  lineHeight: '2rem',
  paddingBottom: '2rem',
})

export const ListItems = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',

  height: 'calc(100vh - 25rem)',
  overflowY: 'scroll',
  whiteSpace: 'nowrap',
})

export const ItemChart = styled('div', {
  display: 'flex',
  gap: '1.25rem',
})

export const ImageContainer = styled('div', {
  width: '6.37rem',
  height: '5.81rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
})

export const InfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  justifyContent: 'center',

  p: {
    color: '$green500',
    cursor: 'pointer',
  },
})

export const ChartInfo = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})

export const LeftSide = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  p: {
    fontSize: '$md',
    fontWeight: 'bold',
  },
})
export const RightSide = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.5rem',

  p: {
    fontSize: '$lg',
    fontWeight: 'bold',
  },
})

export const Button = styled('button', {
  border: 'none',

  width: '100%',
  height: '4rem',

  background: '$green500',
  borderRadius: '8px',
  color: '$white',

  cursor: 'pointer',

  fontSize: '$md',
  fontWeight: 'bold',
  lineHeight: '160%',

  '&:hover': {
    background: '$green400',
  },
})
