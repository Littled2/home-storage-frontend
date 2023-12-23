'use client'

import Link from "next/link";

import styles from "./navitem.module.css"
import { usePathname } from "next/navigation";

export function NavItem({ icon, href, label }) {

    const pathname = usePathname()

    console.log(pathname)

    return (
        <Link href={href} className={[ styles.item, href === "/" && pathname === "/" || pathname.startsWith(href) && href !== "/" ? styles.selected : ''  ].join(" ")}>
            {icon}
            <span className={styles.lbl}>{label}</span>
        </Link>
    )
}