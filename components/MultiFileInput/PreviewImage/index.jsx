import { FaCross } from "react-icons/fa6"
import styles from "./preview.module.css"

export function PreviewImage({ image }) {
    return (
        <div className={styles.preview}>
            <img src={image} />
            <button>
                <FaCross />
            </button>
        </div>
    )
}