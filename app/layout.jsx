'use client'

import { PocketProvider, usePocket } from "@/contexts/PocketContext";
import styles from "./layout.module.css"
import SideBar from "@/components/layout/SideBar";
import "./globals.css"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthCheck } from "@/components/AuthCheck";
import { MdMenu } from "react-icons/md";

export default function HomeLayout({ children }) {

    const pathname = usePathname()

    const { user } = usePocket()

    const [ mainStyles, setMainStyles ] = useState({})


    return (
        <html>
            <body>
                <PocketProvider>
                        <AuthCheck>

                            <SideBar />

                            <main className={[ styles.main, pathname === "/" ? styles.mobileMain : pathname === "/new/item" ? styles.noPadding : "" ].join(" ")} style={mainStyles}>
                                {children}
                            </main>

                        </AuthCheck>
                </PocketProvider>
            </body>
        </html>
    )
}