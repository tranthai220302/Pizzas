"use client"
import React, { useContext, useEffect } from 'react'
import style from './page.module.css'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from 'swr'
import Loading from '@/public/img/loading1.gif'
import CartContext from '@/context/cartContext'
import PizzasContext from '@/context/pizzaContext'
const fetcher = (...args) => fetch(...args).then((res) => res.json())
const ProductItem = ({params}) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const {quantity, setQuantity} = useContext(CartContext);
  const {pizzas, setPizzas}= useContext(PizzasContext);
  const [extra, setExtra] = useState([])
  const [number, setNumber] = useState(1);
  const [arr, setArr] = useState(pizzas)
  const { data, error, isLoading } = useSWR(`http://localhost:3000/api/products/${params.id}`, fetcher)
  useEffect(()=>{
    if(data){
      setPrice(data.prices[0])
    }
  }, [data])
  const chagePrice = (number)=>
  {
    setPrice(price + number);
  }
  const handelClick = (i, data) =>{
    const diffrent = data.prices[i] - data.prices[size] 
    setSize(i)
    chagePrice(diffrent)
  } 
  const hadleChange = (e, options) =>{
    const checked = e.target.checked;
    if(checked){
      chagePrice(options.price)
      setExtra((prev) => [...prev, options])
    }else{
      chagePrice(-options.price)
      setExtra(extra.filter((extra) => extra._id != options._id))
    }
  }
  const handleQuantity = (number) => {
    const parsedQuantity = parseInt(quantity);
    const newQuantity = parsedQuantity + 1;
    console.log(newQuantity);
    setQuantity(newQuantity.toString());
    const pizza = {
        product: data.img,
        name : data.title,
        extras: extra,
        price: price,
        quantity: number,
    }
    setArr((prev) => [...prev, pizza])
  };
  useEffect(() => {
    setPizzas(arr);
  }, [arr]);

  console.log(pizzas)
  return (
    <div className={style.container}>
      {isLoading && (
        <div>
          <Image  
          src = {Loading}
          fill={true}
          />
        </div>
      )}
      {data && (
        <div className={style.imgContainer}>
          <Image 
            className= {style.img}
            src="/img/pizza.png" 
            alt=""
            width="500" 
            height="500" />
        </div>
      )}
      {data && (
            <div className = {style.content}>
            <h1 className={style.title}>
                {data.title}
              </h1>
              <div className={style.price}>{price}$</div>
              <div className={style.desc}>
                {data.desc}
              </div>
              <h2 className={style.titleSelect}>Choose the size</h2>
              <div className={style.imgSelect}>
                <div className={style.size} onClick={() => handelClick(0, data)}>
                  <Image 
                    className={style.imgSize}
                    src = '/img/size.png'
                    alt=''
                    width={30}
                    height={30}
                  />
                  <div className={style.sizeTitle}>Small</div>
                </div>
                <div className={style.size} onClick={() => handelClick(1, data)}>
                  <Image 
                    className={style.imgSize}
                    src = '/img/size.png'
                    alt=''
                    width={40}
                    height={40}
                  />
                  <div className={style.sizeTitle}>Medium</div>
                </div>
                <div className={style.size} onClick={() =>handelClick(2, data)}>
                  <Image 
                    className={style.imgSize}
                    src = '/img/size.png'
                    alt=''
                    width={50}
                    height={50}
                  />
                  <div className={style.sizeTitle}>Large</div>
                </div>
              </div>
              <h2 className={style.titleTopping}>Choose addtional ingredients</h2>
              <div className={style.listTooping}>
                {data.extraOptions.map((options, i) => (
                  <div className={style.item} key = {i}>
                    <input 
                      type="checkbox" 
                      name={options.text} 
                      id={options.text} 
                      className={style.box}
                      onChange={(e) => hadleChange(e, options)}
                      />
                    <label htmlFor="" className={style.label}>{options.text}</label>
                  </div>
                ))}
              </div>
              <div className={style.add}>
                  <input type="number" onChange={(e)=>setNumber(e.target.value)} defaultValue={1} className={style.quantity}/>
                  <button className={style.button} onClick={() => handleQuantity(number)} >Add to Cart</button>
              </div>
            </div>
      )}
</div>
  )
}

export default ProductItem