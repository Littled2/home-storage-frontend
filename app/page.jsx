import styles from "./homepage.module.css"

import { Results } from "@/components/search/Results";
import { SearchBar } from "@/components/search/SearchBar";

export default function Homepage() {
    return (
        <div>

            <div className={styles.hero}>

                <h1>Find Something.</h1>

            </div>

            <div className={styles.search}>

                <SearchBar />

            </div>
            

            <Results />

        </div>
    )
}