import styles from "./search.module.css"
import { LuSearch } from "react-icons/lu"

export function SearchBar() {
    return (
        <div className={styles.cont}>
            <LuSearch />
            <input className={styles.inpt} type="text" placeholder="Search for anything" />
        </div>
    )
}