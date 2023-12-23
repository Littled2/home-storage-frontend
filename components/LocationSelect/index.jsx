'use client'

import { usePocket } from "@/contexts/PocketContext"
import styles from "./LocationSelect.module.css"
import { useEffect, useState } from "react"

export function LocationSelect({ location, setLocation }) {

    const { pb, user } = usePocket()

    const [ locations, setLocations ] = useState()

    useEffect(() => {
        pb.collection("locations").getFullList({
            filter:`gid = '${user.gid}'`,
            sort: "-name"
        })
        .then(locs => {
            setLocations(locs)
            let loc = locs.find(l => l.id === user.activeLocation)
            setLocation(loc ? loc : locs[0])
        })
    }, [])

    return (
        <article className={styles.wrapper}>

            {
                locations?.map(l => {
                    return (
                        <button className={[ styles.location, location?.id === l.id ? styles.selected : '' ].join(" ")} onClick={() => setLocation(l)}>
                            {l.name}
                        </button>
                    )
                })
            }

        </article>
    )
}