'use client'

import { usePocket } from "@/contexts/PocketContext"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function AuthCheck() {

    const { user } = usePocket()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if(!user && pathname !== "/login") {
            router.push("/login")
        }
    }, [pathname])


    return (
        <></>
    )
}