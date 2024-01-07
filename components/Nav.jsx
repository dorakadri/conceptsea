'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
const Nav = () => {
  const pathname = usePathname();
  const {user}=useUser();
  return (
    <nav className='justify-between w-full  items-center flex mb-16 pt-5   '>
       <div className='flex items-center justify-between  gap-6 font-exo'> Conceptsea</div>
   
      <div className='flex items-center justify-between  gap-6 font-exo'>
      <Link href="/" ><p  className={pathname == "/" ? "active" : "link"}>Home</p></Link>
      {user && <><Link href="/Explore"> <p  className={pathname == "/Explore" ? "active" : "link"}> Explore </p></Link>
      <Link href="/Surpriseme"> <p className={pathname == "/Surpriseme" ? "active" : "link"}>Suprise me  </p></Link>
     </> }
      
      </div>
     <div className='font-exo items-center  flex  gap-6 '> 
     {user && <>     <Link href="/CreateIdea" className='btn_gradient cursor-pointer'>Add an idea </Link>  <UserButton afterSignOutUrl='/'/> 
     
     </>  }  
     { !user && <> 

    <SignUpButton>
    <p className='cursor-pointer' >Register</p>

    </SignUpButton>
    <SignInButton>
    <div  className='btn_gradient cursor-pointer'>Login</div>
    </SignInButton>
</>  }  
      </div>
    </nav>
  )
}

export default Nav