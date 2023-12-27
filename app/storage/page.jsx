'use client'

import { LocationSelect } from "@/components/LocationSelect"
import styles from "./storage.module.css"
import { ContainersView } from "@/components/ContainersView"
import { PlacesView } from "@/components/PlacesView"
import { usePocket } from "@/contexts/PocketContext"

export default function StoragePage() {

    const { user } = usePocket()

    return (
        <section className={styles.page}>

            <h2 className="page-heading">Your Entire Storage.</h2>

            <div className={styles.locations}>
                <LocationSelect />
            </div>
                    
            <PlacesView locationID={user?.activeLocation} />

            <ContainersView locationID={user?.activeLocation} />


        </section>
    )
}