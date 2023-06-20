import Image from 'next/image'
import styles from './page.module.css'
import Featured from '@/components/Featured/Featured'
import PizzaList from '@/components/PizzaList/PizzaList'
export default function Home() {
  return (
    <div>
      <Featured />
      <PizzaList />
    </div>
  )
}
