import Image from 'next/image'
import React from 'react'
import rafiki from "../../../public/assets/rafiki.png"
const Errpage =() => {
  return (
    <div  className='h-[100vh] flex flex-col justify-center items-center'>
        <Image src={rafiki} alt=''/>
        <p>Oops! You do not have access to page, Contact Support team marketanalytics@pbrinsight.com for more product insight.</p>
    </div>
  )
}
export  default Errpage