'use client'

import { useCallback, useEffect, useState } from "react"
import styles from "./SelectActiveLocation.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { BsHouse } from "react-icons/bs"
import Link from "next/link"

export function SelectActiveLocation() {

    const [ locations, setLocations ] = useState([])

    const { pb, user } = usePocket()

    useEffect(() => {
        pb.collection("locations").getFullList({
            filter: `gid = '${user.gid}'`
        })
        .then(l => setLocations(l))
    }, [])

    const setActiveLocation = useCallback((locationID) => {
        pb.collection("users").update(user.id, { activeLocation: locationID })
        .then(() => console.log("OK"))
        .catch((err) => console.error(err))
    }, [])

    return (
        <div className={styles.wrapper}>
            {
                locations.map(l => {
                    return (
                        <button className={user.activeLocation == l.id ? styles.selected : ''} onClick={() => setActiveLocation(l.id)} key={l.id}>
                            <BsHouse />
                            {l.name}
                        </button>
                    )
                })
            }
            {
                locations.length === 0 ? (
                    <div className={styles.none}>
                        <div>
                            <Link href={"/new/location"}>Add a location</Link>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}