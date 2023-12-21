'use client'

import { LocationSelect } from "@/components/LocationSelect"
import styles from "./storage.module.css"
import { useState } from "react"
import { ContainersView } from "@/components/ContainersView"

export default function StoragePage() {

    const [ location, setLocation ] = useState(null)

    return (
        <section className={styles.page}>

            <h2 className="page-heading">Storage</h2>

            <div className={styles.locations}>
                <LocationSelect location={{id:"sdas"}} />
            </div>

            <ContainersView />

        </section>
    )
}