'use client'

import { ContainersView } from "@/components/ContainersView"
import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"

import styles from "./place.module.css"


export default function PlaceView({ params }) {

    const [ containers, setContainers ] = useState([])
    const [ place, setPlace ] = useState([])

    const { pb, user } = usePocket()

    useEffect(() => {

        pb.collection("containers").getFullList({
            filter: `gid = '${user.gid}' && place = '${params.placeID}'`
        })
        .then(c => setContainers(c))

        pb.collection("places").getOne(params.placeID, {
            expand: "location"
        })
        .then(p => setPlace(p))

    }, [])

    return (
        <section>

            <div className={styles.titleCont}>
                <h1>{place?.name}</h1>

                <br />

                <p>
                    <span className={styles.location}>{place?.expand?.location?.name}</span>
                </p>
            </div>

            <br />

            <ContainersView placeID={params.placeID} />

        </section>
    )
}