'use client'

import { usePathname } from "next/navigation"
import styles from "./styles.module.css"

export function MainElement({ children }) {

    const pathname = usePathname()

    return (
        <main className={[
                styles.main,
                pathname === "/" ?
                    styles.mobileMain :
                        pathname === "/new/item" ? 
                            styles.noPadding : ""
            ].join(" ")}>
            {children}
        </main>
    )
}