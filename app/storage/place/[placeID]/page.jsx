'use client'

import { ContainersView } from "@/components/ContainersView"
import { usePocket } from "@/contexts/PocketContext"
import { useCallback, useEffect, useState } from "react"

import styles from "./place.module.css"
import { BsDoorClosed } from "react-icons/bs"
import { RxHome } from "react-icons/rx"
import { EditText } from "@/components/EditText"
import { LocationLink } from "@/components/links/Location"
import { PlaceLink } from "@/components/links/Place"

export default function LocationView({ params }) {

    const [ place, setPlace ] = useState()

    const { pb } = usePocket()

    useEffect(() => {
        pb.collection("places").getOne(params.placeID, { expand: "location" })
        .then(p => setPlace(p))
    }, [])

    useEffect(() => {
        console.log(place)
    }, [place])

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

            <div className={styles.locationInfoCont}>
                <LocationLink href={`/storage/location/${place?.expand?.location?.id}`}>{place?.expand?.location?.name}</LocationLink>
            </div>

            <br />

            <br />

            <div>

                <ContainersView placeID={params.placeID} />

            </div>

        </section>
    )
}