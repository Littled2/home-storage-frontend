'use client'

import { usePocket } from "@/contexts/PocketContext"
import styles from "./LocationSelect.module.css"
import { useCallback, useEffect, useState } from "react"

export function LocationSelect() {

    const { pb, user } = usePocket()

    const [ locations, setLocations ] = useState()

    useEffect(() => {
        pb.collection("locations").getFullList({
            filter:`gid = '${user.gid}'`,
            sort: "-name"
        })
        .then(locs => setLocations(locs))
    }, [])

    const setActiveLocation = useCallback((locationID) => {
        pb.collection("users").update(user.id, { activeLocation: locationID })
        .then(() => console.log("OK"))
        .catch((err) => console.error(err))
    }, [])

    return (
        <article className={styles.wrapper}>

            {
                locations?.map((l,i) => {
                    return (
                        <button key={i} className={[ styles.location, user?.activeLocation === l.id ? styles.selected : '' ].join(" ")} onClick={() => setActiveLocation(l.id)}>
                            {l.name}
                        </button>
                    )
                })
            }

        </article>
    )
}