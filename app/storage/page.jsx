'use client'

import { LocationSelect } from "@/components/LocationSelect"
import styles from "./storage.module.css"
import { ContainersView } from "@/components/ContainersView"
import { PlacesView } from "@/components/PlacesView"
import { usePocket } from "@/contexts/PocketContext"
import Link from "next/link"
import { BsPlus, BsPrinter } from "react-icons/bs"

export default function StoragePage() {

    const { user } = usePocket()

    return (
        <section className={styles.page}>

            <h2 className="page-heading">Your Entire Storage.</h2>

            <div className={styles.locations}>

                <div className={styles.top}>
                    <h3>Locations</h3>

                    <Link className={styles.topBtn} href={{ pathname: "/new/location" }}>
                        <span>New Location</span>
                        <BsPlus />
                    </Link>
                </div>

                <LocationSelect />
            </div>
                    
            <PlacesView locationID={user?.activeLocation} />

            <ContainersView locationID={user?.activeLocation} />

            <Link href={"/print-labels/" + user?.activeLocation}><BsPrinter /> Print container labels</Link>

        </section>
    )
}