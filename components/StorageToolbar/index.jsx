'use client'

import { BsSearch } from "react-icons/bs"
import styles from "./toolbar.module.css"
import { useEffect, useState } from "react"
import { usePocket } from "@/contexts/PocketContext"

export function StorageToolbar({ query, setQuery, setLocation }) {

    const [ locations, setLocations ] = useState([])

    const { pb } = usePocket()

    useEffect(() => {
        pb.collection("locations").getFullList({
            sort: "-name"
        })
        .then(setLocations)
        .catch(err => {
            console.error("Error getting locations in the toolbar", err)
        })
    }, [])

    return (
        <div className={styles.toolbar}>

            <div className={styles.searchInputWrapper}>

                <div className={styles.searchIcon}>
                    <BsSearch />
                </div>

                <input type="text" className={styles.searchInput} placeholder="Find something in your storage" value={query} onChange={e => setQuery(e.target.value)} />

            </div>

            <select className={styles.locationSelect} onInput={e => setLocation(e.target.value)}>
                <option value="all-locations">All Locations</option>
                {
                    locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)
                }
            </select>

        </div>
    )
}