'use client'

import Link from "next/link";

import styles from "./navitem.module.css"
import { usePathname } from "next/navigation";

export function NavItem({ icon, href }) {

    const pathname = usePathname()

    return (
        <Link href={href} className={[ styles.item, pathname === href ? styles.selected : ''  ].join(" ")}>
            {icon}
        </Link>
    )
}