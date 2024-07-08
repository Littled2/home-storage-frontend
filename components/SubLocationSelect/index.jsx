'use client'

import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"

export function SubLocationSelect({ locationID, selectedSubLocationID, setSelectedSubLocationID, ...props }) {

    const [ locations, setLocations ] = useState()

    const { pb } = usePocket()

    useEffect(() => {        
        pb.collection("sub_locations").getFullList({
            filter: `location = '${locationID}'`
        })
        .then(locs => setLocations(locs))
    }, [locationID])

    useEffect(() => console.log(selectedSubLocationID))
    return (
        <select {...props} onInput={e => setSelectedSubLocationID(e.target.value)}>
            <option value="" selected={selectedSubLocationID === ""}>No location specified</option>
            {
                locations?.map(l => {
                    return (
                        <option key={l.id} value={l?.id} selected={selectedSubLocationID === l.id}>{l.name}</option>
                    )
                })
            }

        </select>
    )
}