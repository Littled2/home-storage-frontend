'use client'

import { usePocket } from "@/contexts/PocketContext"
import styles from "./LocationSelect.module.css"
import { useEffect, useState } from "react"

export function LocationSelect({ location, setLocation }) {

    const { pb, user } = usePocket()

    const [ locations, setLocations ] = useState()

    useEffect(() => {
        pb.collection("locations").getFullList({
            filter:"gid = " + user.gid
        })
        .then(locs => setLocations(locs))
    }, [])

    return (
        <article className={styles.wrapper}>

            {
                locations?.map(l => {
                    return (
                        <button className={[ styles.location, location.id === l.id ? styles.selected : '' ].join(" ")} onClick={() => setLocation(l)}>
                            {l.name}
                        </button>
                    )
                })
            }

        </article>
    )
}