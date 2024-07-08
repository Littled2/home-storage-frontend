'use client'

import Link from "next/link";

import styles from "./navitem.module.css"
import { usePathname } from "next/navigation";

export function NavItem({ icon, href, label, onlyShowOnPlatform }) {

    const pathname = usePathname()

    console.log(pathname)

    return (
        <Link href={href} className={
            [
                onlyShowOnPlatform === "mobile" ? styles.onlyShowOnMobile : '',
                onlyShowOnPlatform === "desktop" ? styles.onlyShowOnDesktop : '',
                styles.item,
                href === "/" && pathname === "/" || pathname.startsWith(href) && href !== "/" ? styles.selected : '' ,
            ].join(" ")
        }>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.lbl}>{label}</span>
        </Link>
    )
}