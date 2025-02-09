import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-700 flex justify-between gap-5 text-white py-2 px-5 '>
      <div>
        <span className='font-bold text-xl  cursor-pointer'>iTask</span>
      </div>
      <ul className='flex gap-8 '>
        <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>

        <li className='cursor-pointer hover:font-bold transition-all duration-200'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
