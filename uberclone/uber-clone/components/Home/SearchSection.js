import React from 'react'
import InputItem from './InputItem'

function SearchSection() {
  return (
    <div className='p-2 md:pd-5 border-[2px] rounded-xl'>
      <p className='text-[20px] font-bold'> faire un parcours</p>
      <InputItem type='source'/>
      <InputItem type='destination'/>
      <button className='p-3 mt-5 text-white  bg-yellow-400 w-full rounded-lg'>Recherche</button>
    </div>
  )
}

export default SearchSection
