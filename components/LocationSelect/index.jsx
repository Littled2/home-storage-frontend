'use client'

import { usePocket } from "@/contexts/PocketContext"
import styles from "./LocationSelect.module.css"

export function LocationSelect({ location, setLocation }) {

    const { pb } = usePocket()

    const locations = [
        {
            id: "sdas",
            name: "Brackenwood"
        },
        {
            id: "gdsfgsdf",
            name: "48 Culverland"
        },
        {
            id: "asdasd",
            name: "East Park"
        }
    ]

    return (
        <article className={styles.wrapper}>

            {
                locations.map(l => {
                    return (
                        <button className={[ styles.location, location.id === l.id ? styles.selected : '' ].join(" ")}>
                            {l.name}
                        </button>
                    )
                })
            }

        </article>
    )
}