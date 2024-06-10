import { BsBox } from "react-icons/bs";
import styles from "./Container.module.css"
import Link from "next/link";

export function Container({ name, place, id }) {
    return (
        <Link href={`/storage/container/${id}`} className={styles.container}>
            <div className={styles.top}>
                {/* <BsBox /> */}
                <p>{name}</p>
            </div>
            <div>
                <small className={styles.location}>{place?.name}</small>
            </div>
        </Link>
    )
}