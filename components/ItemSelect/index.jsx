'use client'

import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"

export function ItemSelect({ selectedItemID, setSelectedItemID, locationID, ...props}) {

    const [ items, setItems ] = useState()

    const { pb } = usePocket()

    useEffect(() => { 
        console.log(`location = '${locationID}'`)       
        pb.collection("items").getFullList({
            sort: "-name",
            filter: `location = '${locationID}'`
        })
        .then(i => setItems(i))
    }, [])

    return (
        <select {...props} onInput={e => setSelectedItemID(e.target.value)}>
            <option value="" selected={selectedItemID === ""}>Not within item</option>
            {
                items?.map((i,index) => {
                    return (
                        <option key={index} value={i?.id} selected={selectedItemID === i.id}>{i.name}</option>
                    )
                })
            }

        </select>
    )
}