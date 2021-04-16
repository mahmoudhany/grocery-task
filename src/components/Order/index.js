import React from 'react'
import { Link } from 'react-router-dom'
import fruits from '../../images/fruits.jpg'
import './order.css'

export default function Order(props) {

  const { id, name, phoneNumber, timeToDeliver, shopper, location, items, singleProduct } = props.order
  return (
    <Link to={`/orders/${id}`} className='order col-12 col-md-10 col-lg-10 d-flex flex-row mx-auto mt-4'>
      <img src={fruits} alt="" className='col-4 img-fluid' />
      <div className='col-8 d-flex flex-column mx-3 justify-content-around'>
        <div className='order-contact d-flex flex-column flex-md-row justify-content-between'>
          <h6 className='m-2'>Name: <span>{name}</span></h6>
          <h6 className='m-2'>Shopper: <span>{shopper}</span></h6>
          <h6 className='m-2'>Phone number: <span>{phoneNumber}</span></h6>
          {/* <address>address:  </address> */}
          {/* <p>deliver at: {timeToDeliver}</p> */}
        </div>
        <div className='items d-flex flex-row justify-content-between mt-3'>
          {
            items.map(({ name, count }) => (
              <div className='px-3 mr-3' key={name}>
                <p className='name'>{name}</p>
                <p className='quantity'>Quantity: {count}</p>
              </div>
            ))
          }
        </div>
      </div>
    </Link>
  )
}
