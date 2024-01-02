"use client"

import {Avatar,AvatarImage} from '@/components/ui/avatar'
import { 
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger ,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { ChevronsLeftRight } from 'lucide-react'
import { SignOutButton, useUser } from '@clerk/clerk-react'

export const UserItem = () => {
    const {user} = useUser()
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='flex items-center text-sm p-3 w-full hover:bg-primary/5'>
                    <div className='gap-x-2 flex items-center max-w-[150px]'>
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={user?.imageUrl}/>
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            {user?.fullName}&apos;s Jotion
                        </span>
                    </div>
                    <ChevronsLeftRight className='h-4 w-4 text-muted-foreground rotate-90 ml-2'/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="w-80"
                alignOffset={11}
                align='start'
                forceMount
            >
                <div className='flex flex-col space-y-4 p-2'>
                    <p className="text-xs text-muted-foreground font-medium leading-none">
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className='rounded-md bg-secondary p-1'>
                            <Avatar className='h-8 w-8'>
                                <AvatarImage src={user?.imageUrl}/>
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className='text-sm line-clamp-1'>
                                {user?.fullName}&apos;s Jotion
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild className='w-full cursor-pointer text-muted-foreground'>
                    <SignOutButton>
                        Log out
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}