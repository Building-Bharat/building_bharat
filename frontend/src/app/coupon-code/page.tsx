import React from 'react'
import CheckOutHeader from './(component)/CheckOutHeader'
import Coupon from './(component)/Coupon'

const CouponCodePage = () => {
  return (
    <section className='bg-gray-100 pb-8 min-h-screen'>
      <CheckOutHeader/>
      <Coupon/>
    </section>
  )
}

export default CouponCodePage