"use client"

import { Doc } from "@/convex/_generated/dataModel"
import { IconPicker } from "./icon-picker"
import { ImageIcon, Smile, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ElementRef, useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useCoverImage } from "@/hooks/use-cover-image"

interface ToolbarProps {
    initialData : Doc<"documents">
    preview?: boolean
}

export const Toolbar = ({
    initialData,
    preview
} : ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(initialData.title)
    const coverImage = useCoverImage()

    const update = useMutation(api.documents.update)
    const removeIcon = useMutation(api.documents.removeIcon)

    const enableInput = () => {
        if(preview) return ;  
        setIsEditing(true) 

        setTimeout(()=>{
            setValue(initialData.title)
            inputRef.current?.focus()
        },0)
    }

    const disableInput = () => setIsEditing(false)

    const onInput = (value : string) => {
        setValue(value)
        update({
            id : initialData._id,
            title : value
        })
    }

    const onKeydown = (e : React.KeyboardEvent) => {
        if(e.key === "Enter") {
            e.preventDefault()
            disableInput()
        }
    }

    const onIconSelect = (icon : string) => {
        update({
            id : initialData._id,
            icon
        })
    }

    const onIconRemove = () => {
        removeIcon({
            id : initialData._id,
        })
    }

    return (
        <div className="pl-[54px] group relative">
          {!!initialData.icon && !preview &&  (
            <div className="flex items-center gap-x-2 group/icon pt-6">
                <IconPicker onChange={onIconSelect}>
                   <p className="text-6xl hover:opacity-75 transition">
                        {initialData.icon}
                   </p>
                </IconPicker>
                <Button
                    onClick={onIconRemove}
                    className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                    variant="outline"
                    size="icon"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
          )}
          {!!initialData.icon && preview && (
            <p className="text-6xl pt-6">
                {initialData.icon}
            </p>
          )}
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
            {!initialData.icon && !preview && (
                <IconPicker asChild onChange={onIconSelect}>
                    <Button
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <Smile className="h-4 w-4 mr-2"/>
                        Add Icon
                    </Button>
                </IconPicker>
            )}
            {!initialData.coverImage && !preview && (
                <Button 
                    onClick={coverImage.onOpen}
                    className="text-muted-foreground text-xs"
                    variant="outline"
                    size="sm"
                >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Add cover
                </Button>
            )}
          </div>
          {isEditing && !preview ? (
            <TextareaAutosize
                ref={inputRef}
                value={value}
                onBlur={disableInput}
                onChange={(e)=>onInput(e.target.value)}
                onKeyDown={onKeydown}
                className="text-5xl bg-transparent font-bold break-words outline-none resize-none text-[#3F3F3F] dark:text-[#CFCFCF]"
            />
          ): (
            <div 
                className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                onClick={enableInput}
            >
                {initialData.title}
            </div>
          )}
        </div>
    )
}

export default Toolbar