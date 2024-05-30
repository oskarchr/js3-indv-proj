import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

function AuthLayout({ children }) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Button asChild  variant="outline" size="icon" className="absolute top-4 left-4 rounded">
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        { children }
      </div>
    )
  }
  export default AuthLayout