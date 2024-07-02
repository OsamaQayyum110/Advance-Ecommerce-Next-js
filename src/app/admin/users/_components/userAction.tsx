"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { DeleteUser } from "../../_actions/users";


export const DeleteDropdownItem = ({ id, disabled }: {id:string, disabled:boolean  }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
        
            disabled={isPending || disabled}
            variant="destructive"
            onClick={() => {
                startTransition(async () => {
                    await DeleteUser(id)
                    router.refresh()
                })
            }} >
            Delete
        </DropdownMenuItem>

    )
}