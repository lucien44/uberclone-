import React from 'react'
import { Image } from 'next/dist/client/image-component';
import { UserButton } from '@clerk/nextjs';
function Header() {
    const HeaderMenu=[
        {
            id: 1,
            name:'Conduire',
            icon:'/taxci.jpg'
        },
        {
            id:2,
            name:'boîte',
            icon:'/box.jpg'

        }
    ]
  return (
    <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between'>
      <div className='flex gap-24 items-center'>
        <Image src='/logo.jpg' alt='logo' width={70} height={70}/>
        <div className='flex gap-6 items-center'>
            {HeaderMenu.map((item)=>(
                <div className='flex gap-2 items-center'>
                    <Image src={item.icon} alt={item.name} width={70} height={70}/>
                    <h2 className='text-[14px] font-medium'>{item.name}</h2>
                 </div>))}
        </div>
      </div>
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default Header
