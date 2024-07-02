"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { DeleteUser } from "../../_actions/users";


export const DeleteDropdownItem = ({ id }: {id:string  }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
        
            disabled={isPending}
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