import React from 'react'

const Hero = () => {
  return (
    <>
    <div className=" p-5 text-[rgb(223_229_236)] main bg-[#0d1216] w-full border-b border-gray-300 min-h-[80vh] flex flex-col flex-grow items-center justify-center text-center">
        <h1 className='text-3xl md:text-5xl font-bold'>Track Your Crypto Portfolio with Ease</h1>
        <p className='text-1.5xs md:text-lg text-gray-400 mt-4 mb-4'>Get live prices, track your investments, and view analytics in one place</p>
        <button type="button" className=" shadow-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 inline-flex items-center justify-center font-semibold text-sm leading-5 rounded-lg select-focus:outline-none px-2.5 py-1.5">Get Started</button>
    </div>
    </>
  )
}

export default Hero
