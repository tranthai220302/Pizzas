import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
const PizzaCard = ({pizza}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`}>
        <Image src= {pizza.img} alt="" width="300" height="300" />
        <h1 className={styles.title}>{pizza.title}</h1>
        <div className={styles.priceWrapper}>
        <span className={styles.price}>${pizza.prices[1]}</span>
        </div>
        <p className={styles.desc}>
          {pizza.desc}
        </p>
      </Link>
    </div>
  )
}
export default PizzaCard