import { BsDoorClosed } from "react-icons/bs";
import styles from "./Place.module.css"
import Link from "next/link";

export function Place({ name, id }) {
    return (
        <Link className={styles.container} href={`/storage/place/${id}`}>
            <BsDoorClosed />
            <p>{name}</p>
        </Link>
    )
}