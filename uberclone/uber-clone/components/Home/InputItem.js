import React from 'react'
import { Image } from 'next/dist/client/image-component';
function InputItem({type}) {
  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4 '>
      <Image src={type=='source'?'/source.png':'/dest.png'} alt='source' width={15} height={15}/>
      <input type='text' placeholder={type=='source'?'choisir une positione':'lieu de destinatio'} className='bg-transparent w-full outline-none'/>
    </div>
  )
}

export default InputItem
