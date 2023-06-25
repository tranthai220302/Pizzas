"use client"
import styles from "./page.module.css";
import Image from "next/image";
import PizzasContext from "../../../context/pizzaContext";
import CartContext from "../../../context/cartContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
const Cart = () => {
  const [total, setTotal] = useState(0)
  const [openi, setOpeni] = useState(false)
  const {pizzas, setPizzas}= useContext(PizzasContext);
  const {quantity, setQuantity} = useContext(CartContext);
  const router = useRouter();
  const amount = total;
  const currency = "USD";
  const style = {"layout":"vertical"};
  const ButtonWrapper = ({ currency, showSpinner }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 200) {
        setQuantity(0);
        setPizzas([]);
        router.push(`/order/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
      dispatch({
          type: "resetOptions",
          value: {
              ...options,
              currency: currency,
          },
      });
  }, [currency, showSpinner]);
  return (<>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[amount, currency, style]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                  return actions.order
                      .create({
                          purchase_units: [
                              {
                                  amount: {
                                      currency_code: currency,
                                      value: amount,
                                  },
                              },
                          ],
                      })
                      .then((orderId) => {
                          return orderId;
                      });
              }}
              onApprove={function (data, actions) {
                  return actions.order.capture().then(function (detail) {
                    console.log(detail)
                    const data = {
                      "customer" : detail.payer.name.given_name + detail.payer.name.surname,
                      "address" : detail.payer.address.country_code,
                      "total": total,
                      "method": 1,
                    }
                    createOrder(data)
                  });
              }}
          />
      </>
  );
}

  useEffect(()=>{
    setTotal(0)
    pizzas.map((piza)=>{
      setTotal((prev)=> {return prev + piza.price*piza.quantity})
    })
  }, [pizzas])
  console.log(total)
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {pizzas.length >0 && pizzas.map((pizaa) =>(
              <tr className={styles.tx}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src={pizaa.product}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>{pizaa.name}</span>
              </td>
              <td>
                <span className={styles.extras}>
                {pizaa.extras.length > 0 && pizaa.extras.map((item)=>(
                    <p>{item.text}</p>
                  ))}
                </span>
              </td>
              <td>
                <span className={styles.price}>${pizaa.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{pizaa.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>${pizaa.price*pizaa.quantity}</span>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total}
          </div>
          {openi ? (
            <div className={styles.payment}>
              <div className={styles.payButton}>CASH ONDELIVERY</div>
              <PayPalScriptProvider
                options={{
                    "clientId": "ATcidMxDwkK9AfJEZN_q-RA-UYlvGzXS94ErhhaKBt5xDwcApnuVVctEULiqoocTtstuFSn8rSkDkLK9",
                    components: "buttons",
                    currency: "USD",
                    'disableFunding': "card"
                }}
                >
                <ButtonWrapper
                  currency={currency}
                  showSpinner={false}
                />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={()=> setOpeni(true)} className={styles.button}>CHECKOUT NOW!</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;