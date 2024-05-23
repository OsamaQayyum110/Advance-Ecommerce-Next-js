"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useTransition } from "react"
import { toggleProductAvailabilty, toggleProductDelete } from "../../_actions/products";

export const ActiveToggleDropdownItem = ({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await toggleProductAvailabilty(id, !isAvailableForPurchase)
                    router.refresh()
                })
            }} >
            {isAvailableForPurchase ? "Deactivate" : "Activate"}
        </DropdownMenuItem>

    )
}
export const DeleteDropdownItem = ({ id, disabled }: {id:string, disabled:boolean  }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
        
            disabled={isPending || disabled}
            variant="destructive"
            onClick={() => {
                startTransition(async () => {
                    await toggleProductDelete(id)
                    router.refresh()
                })
            }} >
            Delete
        </DropdownMenuItem>

    )
}