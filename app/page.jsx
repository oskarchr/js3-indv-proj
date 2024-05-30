import { Button } from '@/components/ui/button'
import { SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function LandingPage() {
  return (
    <main>
      <div class="min-h-screen flex items-center justify-center">
        <div class="bg-slate-700 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center">Welcome to EventFinder</h1>
          <h2 className="text-center text-muted-foreground mb-6">Please sign in to browse events</h2>
        <div class="flex flex-col space-y-4">
          <SignedOut>
            <SignInButton>
              <Button>
                <p>Sign in</p>
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="secondary">
                <p>Sign up</p>
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button asChild>
              <Link href="/events">
                <p>Browse events</p>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <SignOutButton>
              <Button variant="secondary">
                <p>Sign out</p>
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
        </div>
      </div>
    </main>
  )
}

export default LandingPage