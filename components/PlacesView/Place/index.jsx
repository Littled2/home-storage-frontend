import { BsDoorClosed } from "react-icons/bs";
import styles from "./Place.module.css"
import Link from "next/link";

export function Place({ name, id }) {
    return (
        <Link className={styles.container} href={`/storage/place/${id}`}>
            <span className={styles.icon}>
                <BsDoorClosed />
            </span>
            <p>{name}</p>
        </Link>
    )
}