import React from 'react'

const Card = (props) => {
  return (
    <div className='border border-white rounded-xl py-2 px-4'>
      <div className={`text-xs sm:text-sm lg:text-lg font-bold ${props.color?(props.value>0?'text-green-300':'text-red-300'):''}`} >
        {props.name}{props.value}
        </div>
      <div className="info text-[8px] sm:text-xs lg:text-sm">
        {props.title}
        <span>{props.pnl}</span>
      </div>
    </div>
  )
}

export default Card
