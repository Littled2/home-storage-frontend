'use client'

import styles from "./homepage.module.css"

import { Results } from "@/components/search/Results";
import { SearchBar } from "@/components/search/SearchBar";
import { useState } from "react";

export default function Homepage() {

    const [ query, setQuery ] = useState('')

    return (
        <div>

            <div className={styles.hero}>

                <h1>Find Something.</h1>

            </div>

            <div className={styles.search}>

                <SearchBar query={query} setQuery={setQuery} />

            </div>
            

            <Results query={query} />

        </div>
    )
}