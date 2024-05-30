import { Button } from '@/components/ui/button'
import { SignOutButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className="flex justify-between bg-slate-800 p-4">
      <h1 className="text-3xl font-bold">EventFinder</h1>
      <SignOutButton redirectUrl='/'> 
        <Button>
          <p>Sign out</p>
        </Button>
      </SignOutButton>
    </div>
  )
}

export default Header