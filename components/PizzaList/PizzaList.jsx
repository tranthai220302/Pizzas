import React from 'react'
import style from './page.module.css'
import PizzaCard from '../PizzaCard/PizzaCard'


const PizzaList = async({pizzaList}) => {

  return (
    <div className={style.container}>
        <h1 className={style.title}>THE BEST PIZZA IN TOWN</h1>
        <p className={style.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
          in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit.
        </p>
        <div className={style.wrapper}>
          {pizzaList.map((piza)=>(
            <PizzaCard key = {piza._id} pizza = {piza} />
          ))}   
        </div>
    </div>
  )
}

export default PizzaList