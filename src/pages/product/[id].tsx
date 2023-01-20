import { GetStaticPaths, GetStaticProps } from 'next'

import Image from 'next/image'
import Stripe from 'stripe'

import { useShoppingCart } from 'use-shopping-cart'

import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

import Head from 'next/head'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    formatedPrice: string
    description: string
    defaultPriceId: string
    currency: string
    price: number
  }
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  const addItemCart = () => {
    const item = {
      sku: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.imageUrl,
      price_id: product.defaultPriceId,
    }

    addItem(item)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formatedPrice}</span>
          <p>{product.description}</p>
          <button onClick={addItemCart}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_N4yljuAePqNXiE' } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  console.log(params)
  if (params === undefined)
    return { redirect: { destination: '/', permanent: false } }

  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price
  const setPrice = price.unit_amount === null ? 0 : price.unit_amount / 100

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        // price é retornado em centavos, por isso divide por 100
        formatedPrice: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(setPrice),
        description: product.description,
        defaultPriceId: price.id,
        currency: price.currency,
        price: price.unit_amount,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
