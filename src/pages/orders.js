import React, { useEffect, useState } from 'react'
import axios from '../API';
import Order from '../components/Order'

export default function Orders() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const response = await axios.get('/Orders')
      setOrders(response.data)
      setLoading(false)
    }
    fetchOrders()
  }, [])
  return (
    <div>
      {
        loading ?
          <h6>loading...</h6>
          :
          orders.map((order) => (
            <Order order={order} key={order.id} />
          ))
      }
    </div>
  )
}
