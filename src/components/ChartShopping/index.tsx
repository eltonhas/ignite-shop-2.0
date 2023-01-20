import { useState } from 'react'
import axios from 'axios'

import Image from 'next/image'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'

import { useShoppingCart } from 'use-shopping-cart'

import {
  Close,
  Content,
  Title,
  ListItems,
  ImageContainer,
  InfoContainer,
  ItemChart,
  Button,
  ChartInfo,
  LeftSide,
  RightSide,
} from './style'

export default function ChartShopping() {
  const { cartDetails, cartCount, formattedTotalPrice, removeItem } =
    useShoppingCart()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true)
      if (!cartDetails) return

      const listItem = Object.keys(cartDetails).map((item) => {
        return {
          price: cartDetails[item].price_id,
          quantity: cartDetails[item].quantity,
        }
      })

      console.log(listItem)
      const response = await axios.post('/api/checkout', {
        listItem,
      })

      const { checkoutUrl } = response.data

      console.log(checkoutUrl)

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }
  return (
    <Dialog.Portal>
      <Content>
        <Close>
          <X size={24} />
        </Close>
        <Title>Sacola de Compras</Title>

        <ListItems>
          {cartCount === 0 || !cartDetails ? (
            <div>Carrinho Vazio</div>
          ) : (
            Object.keys(cartDetails).map((item) => {
              return (
                <ItemChart key={cartDetails[item].id}>
                  <ImageContainer>
                    <Image
                      src={cartDetails[item].image}
                      alt=""
                      width={101.94}
                      height={93}
                    />
                  </ImageContainer>
                  <InfoContainer>
                    <span>
                      {cartDetails[item].name} X {cartDetails[item].quantity}
                    </span>
                    <span>{cartDetails[item].formattedValue}</span>
                    <p onClick={() => removeItem(cartDetails[item].id)}>
                      Remover
                    </p>
                  </InfoContainer>
                </ItemChart>
              )
            })
          )}
        </ListItems>
        <footer>
          <ChartInfo>
            <LeftSide>
              <span>Quantidade</span>
              <p>Valor total</p>
            </LeftSide>
            <RightSide>
              <span>{cartCount} itens</span>
              <p>{formattedTotalPrice}</p>
            </RightSide>
          </ChartInfo>
          <Button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}
          >
            Finalizar compra
          </Button>
        </footer>
      </Content>
    </Dialog.Portal>
  )
}
