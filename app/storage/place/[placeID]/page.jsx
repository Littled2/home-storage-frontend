'use client'

import { ContainersView } from "@/components/ContainersView"
import { usePocket } from "@/contexts/PocketContext"
import { useCallback, useEffect, useState } from "react"

import styles from "./place.module.css"
import { BsDoorClosed } from "react-icons/bs"
import { RxHome } from "react-icons/rx"
import { EditText } from "@/components/EditText"

export default function LocationView({ params }) {

    const [ place, setPlace ] = useState()

    const { pb } = usePocket()

    useEffect(() => {
        pb.collection("places").getOne(params.placeID, { expand: "location" })
        .then(p => setPlace(p))
    }, [])

    return (
        <section>

            <h1 className={styles.heading}>
                <BsDoorClosed />
                {
                    place ? (
                        <EditText text={place.name} collection={"places"} id={place.id} field={"name"} />
                    ) : (
                        <></>
                    )
                }
            </h1>

            <br />

            <p className={styles.location}>
                <RxHome />
                <span>{place?.expand?.location?.name}</span>
            </p>

            <br />

            <br />

            <div>

                <ContainersView placeID={params.placeID} />

            </div>

        </section>
    )
}