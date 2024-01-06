"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { 
    DropdownMenu,
    DropdownMenuContent ,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/clerk-react"
import { MoreHorizontal, Trash } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface MenuProps {
    documentId : Id<"documents">
}

export const Menu = ({documentId} : MenuProps) => {
    const {user} = useUser()
    const router = useRouter()
    const archive = useMutation(api.documents.archive)

    const onArchive = () => {
        const promise = archive({id : documentId})

        toast.promise(promise,{
            loading : "Moving document to trash...",
            success : "Document moved to trash",
            error : "Error while moving a document to trash"
        })

        router.push("/documents")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60" 
                align="end" 
                alignOffset={8} 
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2"/>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <div className="text-xs text-muted-foreground p-2">
                    Last edited by {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeleton(){
    return(
        <Skeleton className="h-6 w-6"/>
    )
}
