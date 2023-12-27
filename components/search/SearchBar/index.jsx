import { BsSearch } from "react-icons/bs"
import styles from "./search.module.css"
import { LuSearch } from "react-icons/lu"

export function SearchBar({ query, setQuery }) {
    return (
        <div className={styles.cont}>
            <LuSearch />
            <input className={styles.inpt} value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="Search for anything" />
        </div>
    )
}