'use client'

import { PocketProvider, usePocket } from "@/contexts/PocketContext";
import styles from "./layout.module.css"
import Navbar from "@/components/layout/Navbar";
import "./globals.css"
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AuthCheck } from "@/components/AuthCheck";

export default function HomeLayout({ children }) {

    const pathname = usePathname()

    const { user } = usePocket() 

    return (
        <html>
            <body>
                <PocketProvider>
                    <AuthCheck />
                    <main className={styles.appWrapper}>

                        <section className={pathname !== "/" ? styles.content : styles.searchContent}>
                            {children}
                        </section>

                        <Navbar />

                    </main>
                </PocketProvider>
            </body>
        </html>
    )
}