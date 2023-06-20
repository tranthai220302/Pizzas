import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
const PizzaCard = () => {
  return (
    <div className={styles.container}>
      <Image src="/img/pizza.png" alt="" width="300" height="300" />
      <h1 className={styles.title}>FIORI DI ZUCCA</h1>
      <div className={styles.priceWrapper}>
      <span className={styles.price}>$19.90</span>
      </div>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  )
}

export default PizzaCard