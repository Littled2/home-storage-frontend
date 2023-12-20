'use client'

import { PocketProvider, usePocket } from "@/contexts/PocketContext";
import styles from "./layout.module.css"
import Navbar from "@/components/layout/Navbar";
import "./globals.css"
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HomeLayout({ children }) {

    const { user } = usePocket()
    const pathname = usePathname()

    return (
        <html>
            <body>
                <PocketProvider>
                    <main className={styles.appWrapper}>

                        <section className={styles.content}>
                            {children}
                        </section>

                        <Navbar />

                    </main>
                </PocketProvider>
            </body>
        </html>
    )
}