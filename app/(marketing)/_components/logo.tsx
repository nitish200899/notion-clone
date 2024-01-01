import Image from "next/image"
import { Poppins } from "next/font/google"

import {cn} from "@/lib/utils"

const Font = Poppins({
    subsets: ['latin'],
    weight : ["400", "600"],
})

const Logo = () => {
  return (
   <div className="hidden md:flex items-center gap-x-2">
        <Image 
            src='/logo.svg' 
            alt="Logo" 
            width="40"
            height="40"
        />
   </div>
  )
}

export default Logo