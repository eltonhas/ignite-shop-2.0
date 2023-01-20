import { useShoppingCart } from 'use-shopping-cart'

import { Handbag } from 'phosphor-react'
import { HandBagContainer } from './styles'

export default function CartButton() {
  const { cartCount } = useShoppingCart()
  return (
    <HandBagContainer>
      <Handbag size={32} />
      {cartCount !== 0 && <span>{cartCount}</span>}
    </HandBagContainer>
  )
}
