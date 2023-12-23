import { BsBox } from "react-icons/bs";
import styles from "./Container.module.css"
import Link from "next/link";

export function Container({ name, place, id }) {
    return (
        <Link href={`/storage/container/${id}`} className={styles.container}>
            <BsBox />
            <div className={styles.info}>
                <p>{name}</p>
                <p>
                    <small className={styles.location}>{place?.name}</small>
                </p>
            </div>
        </Link>
    )
}