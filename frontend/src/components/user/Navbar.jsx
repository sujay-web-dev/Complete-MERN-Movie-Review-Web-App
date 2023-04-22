import React from 'react'
import { BsFillSunFill } from 'react-icons/bs'

function Navbar() {
  return (
    <div className="bg-secondary">
      <div className=" text-white max-w-screen-xl mx-auto p-2">
        <div className="flex justify-between items-center">
          <img src="./Review.png" alt="" srcset="" className='h-10' />
          <ul className='flex items-center space-x-4'>
            <li>
              <button className='bg-dark-subtle p-1 rounded'>
                <BsFillSunFill className='text-secondary' size={24} />
              </button>
            </li>
            <li>
              <input type="text" className='border-2 border-dark-subtle p-1 rounded bg-transparent 
              text-xl outline-none focus:border-white transition text-white' placeholder='Search...' />
            </li>
            <li className='text-white font-semibold text-lg'>Login</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar