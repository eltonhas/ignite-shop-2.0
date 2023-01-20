import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Stripe from 'stripe'

import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '../lib/stripe'

import { HomeContainer, Product, HandBagContainer } from '../styles/pages/home'
import { Handbag } from 'phosphor-react'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    formatPrice: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              // quando temos muitos links a serem exibidos o ideal é deixar false
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.formatPrice}</span>
                  </div>
                  <HandBagContainer>
                    <Handbag size={32} />
                  </HandBagContainer>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    const setPrice = price.unit_amount === null ? 0 : price.unit_amount / 100

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      // price é retornado em centavos, por isso divide por 100
      formatPrice: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(setPrice),
    }
  })

  console.log(products)

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
