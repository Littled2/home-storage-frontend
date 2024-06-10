import Link from "next/link"
import styles from "../link.module.css"
import { BsHouse } from "react-icons/bs"

export function LocationLink({ href, children }) {
    return (
        <Link href={href} className={styles.link}>
            <BsHouse />
            {children}
        </Link>
    )
}