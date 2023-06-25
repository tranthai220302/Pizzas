import Image from 'next/image'
import styles from './page.module.css'
import Featured from '@/components/Featured/Featured'
import PizzaList from '@/components/PizzaList/PizzaList'
import axios from 'axios'
import { Piazzolla } from 'next/font/google'

export const getData = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: 'no-store'
  });
  return res.json();
};


export default async function Page() {
  const pizzaList = await getData()
  return (
    <div>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  )
}
 