'use client'

import { usePocket } from "@/contexts/PocketContext"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function AuthCheck({ children }) {

    const { user } = usePocket()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if(!user && pathname !== "/login" && pathname !== "/create-account") {
            router.push("/login")
        }
    }, [pathname])


    return children
}