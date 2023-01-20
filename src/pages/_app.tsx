import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import Image from 'next/image'

import { CartProvider } from 'use-shopping-cart'

import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'
import ChartShopping from '../components/ChartShopping'
import CartButton from '../components/CartButton'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.STRIPE_PUBLIC_KEY!}
      currency="BRL"
      successUrl={`${process.env.NEXT_URL}/successn?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={`${process.env.NEXT_URL}/`}
      allowedCountries={['US', 'BRL']}
      billingAddressCollection={true}
      shouldPersist={true}
    >
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button>
                <CartButton />
              </button>
            </Dialog.Trigger>
            <ChartShopping />
          </Dialog.Root>
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
