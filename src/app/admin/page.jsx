"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import useSWR from 'swr'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default  function admin() {
    const {data, error, isLoading} = useSWR(`http://localhost:3000/api/products`, fetcher)
    const {data : orderList, error: errorOrder, isLoading: isLoadingOrder} = useSWR(`http://localhost:3000/api/orders`, fetcher)
    const [pizzas, setPizzas] = useState(data)
    const [orders, setOrders] = useState(orderList)
    const router = useRouter();
    useEffect(()=>
    {
        setPizzas(data);
    }, [data])
    useEffect(()=>
    {
        setOrders(orderList);
    }, [orderList])

    const handleDelete = async (id) =>{
        try {
            const res = await axios.delete("http://localhost:3000/api/products/" + id);
            setPizzas(pizzas.filter((pizza) =>  pizza._id != id))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.container}>
          <div className={styles.item}>
            <h1 className={styles.title}>Products</h1>
            {isLoading && (
                <div>Loading............</div>
            )}
            {pizzas && (
            <table className={styles.table}>
            <tbody>
                <tr className={styles.trTitle}>
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
                </tr>
            </tbody>
            {pizzas.map((product) => (
                <tbody key={product._id}>
                <tr className={styles.trTitle}>
                    <td>
                    <Image
                        src={product.img}
                        width={50}
                        height={50}
                        objectFit="cover"
                        alt=""  
                    />
                    </td>
                    <td>{product._id.slice(0, 5)}...</td>
                    <td>{product.title}</td>
                    <td>${product.prices[0]}</td>
                    <td>
                    <button className={styles.button}>Edit</button>
                    <button
                        className={styles.button}
                        onClick={() => handleDelete(product._id)}
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                </tbody>
            ))}
            </table>
            )}
          </div>
          <div className={styles.item}>
            <h1 className={styles.title}>Orders</h1>
            {isLoadingOrder && (
                <div>Loading............</div>
            )}
            {orders && (
                <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                    <th>Id</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>
                </tbody>
                {orderList.map((order) => (
                    <tbody key={order._id}>
                    <tr className={styles.trTitle}>
                        <td>{order._id.slice(0, 5)}...</td>
                        <td>{order.customer}</td>
                        <td>${order.total}</td>
                        <td>
                        {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                        </td>
                        <td>{status[order.status]}</td>
                        <td>
                        <button onClick={() => handleStatus(order._id)}>
                            Next Stage
                        </button>
                        </td>
                    </tr>
                    </tbody>
                ))}
                </table>
            )}
          </div>
        </div>
      );
    };
