'use client'

import { ContainersView } from "@/components/ContainersView"
import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"

export default function LocationView({ params }) {

    const { pb } = usePocket()

    const [ location, setLocation ] = useState(null)

    useEffect(() => {

        pb.collection("locations").getOne(params.locationID)
        .then(loc => setLocation(location))

    }, [])

    return (
        <section>
            <h1>Location View.</h1>
            <h1>{location?.name}</h1>

            <br />

            <div>

                <ContainersView />

            </div>

        </section>
    )
}