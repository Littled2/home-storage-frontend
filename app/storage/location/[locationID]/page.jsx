'use client'

import { ContainersView } from "@/components/ContainersView"
import { EditText } from "@/components/EditText"
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
            <h1>
                {
                    location ? (
                        <EditText text={location.name} collection={"locations"} id={location.id} field={"name"} />
                    ) : (
                        <></>
                    )
                }
            </h1>

            <br />

            <div>

                <ContainersView />

            </div>

        </section>
    )
}