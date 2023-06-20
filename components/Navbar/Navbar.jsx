import React from 'react'
import style from './page.module.css'
import logo from '@/public/img/logo.png'
import phone from '@/public/img/telephone.png'
import cart from '@/public/img/cart.png'
import Image from 'next/image'
const Navbar = () => {
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
            <Image 
            className={style.logo}
            src = {logo}
            width={160}
            height={69}
            />
          </li>
          <li className={style.listItem}>Events</li>
          <li className={style.listItem}>Blog</li>
          <li className={style.listItem}>Contact</li>
        </ul>
      </div>
      <div className={style.item}>
          <div className={style.cart}>
            <Image 
            className={style.imgCart}
            src = {cart}
            width={30}
            height={30}
            />
          </div>
          <div className={style.number}>2</div>
      </div>
    </div>
  )
}

export default Navbar