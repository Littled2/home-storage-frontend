import { BsSearch } from "react-icons/bs"
import styles from "./search.module.css"

export function SearchBar() {
    return (
        <div className={styles.cont}>
            <BsSearch />
            <input className={styles.inpt} type="text" placeholder="Search for anything" />
        </div>
    )
}