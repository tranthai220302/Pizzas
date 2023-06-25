"use client"
import React, { useContext } from 'react'
import style from './page.module.css'
import logo from '@/public/img/logo.png'
import phone from '@/public/img/telephone.png'
import cart from '@/public/img/cart.png'
import Image from 'next/image'
import CartContext from '@/context/cartContext'
import Link from 'next/link'
const Navbar = () => {
  const {quantity, setQuantity} = useContext(CartContext);
  return (
    <div className={style.container}>
      <div className={style.item}>
        <div className={style.callButton}>
          <Image 
          className={style.call}
          src = {phone}
          width={32}
          height={32}
          />
        </div>
        <div className={style.texts}>
          <div className={style.text}>ORDER NOW</div>
          <div className={style.text}>0378993225</div>
        </div>
      </div>
      <div className={style.item}>
        <ul className={style.list}>
          <li className={style.listItem}>HomePage</li>
          <li className={style.listItem}>Products</li>
          <li className={style.listItem}>Menu</li>
          <li className={style.listItem}>
            <Link href="\">
              <Image 
                className={style.logo}
                src = {logo}
                width={160}
                height={69}
              />
            </Link>
          </li>
          <li className={style.listItem}>Events</li>
          <li className={style.listItem}>Blog</li>
          <li className={style.listItem}>Contact</li>
        </ul>
      </div>
      <Link href = "/cart">
      <div className={style.item}>
          <div className={style.cart}>
            <Image 
            className={style.imgCart}
            src = {cart}
            width={30}
            height={30}
            />
          </div>
          <div className={style.number}>{quantity}</div>
      </div></Link>
    </div>
  )
}

export default Navbar