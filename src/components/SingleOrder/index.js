import React, { useEffect, useState } from 'react'
import axios from '../../API'
import fruits from '../../images/fruits.jpg'


export default function SingleOrder(props) {
  const [{ name, phoneNumber, timeToDeliver, shopper, location, items }, setOrder] = useState({})

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(`/Orders/${props.match.params.id}`)
      setOrder(response.data)
    }
    fetchOrder()
  }, [props.match.params.id])

  return (
    <div className='col-12 col-md-10 col-lg-10 d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start mx-auto mt-5'>
      <img src={fruits} alt="" className='col-12 col-md-6 img-fluid' />
      <div className='col-12 col-md-6 d-flex flex-column mx-3 justify-content-between'>
        <div className='order-contact d-flex flex-column flex-md-row justify-content-between mt-4 mt-md-0'>
          <h6 className='m-2'>Name: <span>{name}</span></h6>
          <h6 className='m-2'>Shopper: <span>{shopper}</span></h6>
          <h6 className='m-2'>Phone number: <span>{phoneNumber}</span></h6>
        </div>
        <div className=' d-flex flex-row justify-content-between mt-3'>
          {
            items &&
            items.map(({ name, count }) => (
              <div className='px-3 mr-3' key={name}>
                <p className='name'>{name}</p>
                <p className='quantity'>Quantity: {count}</p>
              </div>
            ))
          }
        </div>
        <div>
          <address>
            Address: <span style={{ fontWeight: 200, fontSize: '14px' }}>location</span>
          </address>
          <p>
            deliver at: <span style={{ fontWeight: 200, fontSize: '14px' }}>{timeToDeliver}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
