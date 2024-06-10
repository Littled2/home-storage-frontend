import Link from "next/link"
import styles from "../link.module.css"
import { BsDoorClosed } from "react-icons/bs"

export function PlaceLink({ href, children }) {
    return (
        <Link href={href} className={styles.link}>
            <BsDoorClosed />
            {children}
        </Link>
    )
}