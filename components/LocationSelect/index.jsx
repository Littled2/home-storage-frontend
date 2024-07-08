'use client'

import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"

export function LocationSelect({selectedLocationID, setSelectedLocationID, ...props}) {

    const [ locations, setLocations ] = useState()

    const { pb } = usePocket()

    useEffect(() => {        
        pb.collection("locations").getFullList({
            sort: "-name"
        })
        .then(locs => setLocations(locs))
    }, [])

    return (
        <select {...props} onInput={e => setSelectedLocationID(e.target.value)}>
            <option value="" selected={selectedLocationID === ""}>No location specified</option>
            {
                locations?.map((l,i) => {
                    return (
                        <option key={i} value={l?.id} selected={selectedLocationID === l.id}>{l.name}</option>
                    )
                })
            }

        </select>
    )
}