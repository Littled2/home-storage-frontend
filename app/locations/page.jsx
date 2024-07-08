'use client'

import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import Link from "next/link"
import { LocationItem } from "@/components/LocationItem"

export default function LocationsPage() {

    const { pb, user } = usePocket()

    const [ loading, setLoading ] = useState(true)
    const [ locations, setLocations ] = useState([])


    useEffect(() => {

        pb.collection("locations_info").getFullList()
        .then(locs => {
            console.log({locs})
            setLoading(false)
            setLocations(locs)
        })

    }, [])


    return (
        <section className={styles.page}>

            <h1 className={styles.heading}>Locations</h1>

            {
                loading && (
                        <center>Loading...</center>
                    )
            }
            {
                locations.length === 0 && !loading && (
                    <div className={styles.nothingHere}>
                        <center>You haven't added any locations yet!</center>
                        <center><Link href={"/new/location"}>Create one</Link></center>
                    </div>
                )
            }

            <div className={styles.locationsWrapper}>
                {
                    locations.map((l,i) => {
                        return <LocationItem location={l} key={i} />
                    })
                }
            </div>

            <Link href={"/new/location"} className={styles.newLocationBtn}>
                <img src="/add.png" />
                <span>Add Location</span>
            </Link>

        </section>
    )
}