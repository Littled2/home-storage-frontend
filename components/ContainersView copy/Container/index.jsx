import { BsBox } from "react-icons/bs";
import styles from "./Container.module.css"

export function Container({ name }) {
    return (
        <div className={styles.container}>
            <BsBox />
            <p>{name}</p>
            <p>
                <small>Edward's Bedroom</small>
            </p>
        </div>
    )
}