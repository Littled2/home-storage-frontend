import Link from "next/link"
import styles from "../link.module.css"
import { MdPlace } from "react-icons/md"

export function LocationLink({ href, children }) {
    return (
        <Link href={href} className={styles.link}>
            <MdPlace />
            {children}
        </Link>
    )
}