import { BsBox } from "react-icons/bs"
import styles from "./item.module.css"
import Link from "next/link"

export function ItemResult({ name, containerID, containerName }) {
    return (
        <Link href={"/storage/container/" + containerID} className={styles.item}>
            <p>{name}</p>
            <p className={styles.container}>
                <BsBox />
                <span>{containerName}</span>
            </p>
        </Link>
    )
}