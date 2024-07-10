'use client'

import { PrintPreview } from "@/components/PrintPreview";
import { usePocket } from "@/contexts/PocketContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PrintLabelsPage() {

    const [ items, setItems ] = useState([])
    const params = useSearchParams()

    const [ selectedLocation, setSelectedLocation ] = useState(params.has("locationID") ? params.get("locationID") : null)

    const prevRef = useRef()

    const { pb } = usePocket()

    useEffect(() => {

        let filter = ""

        if(selectedLocation && selectedLocation !== "all-locations") {
            filter = `location = "${selectedLocation}"`
        }

        if(params.has("itemID")) {
            filter = `id = "${params.get("itemID")}"`
        }

        pb.collection("items").getFullList({
            sort: "name",
            filter: filter
        })
        .then(setItems)
    }, [selectedLocation])

    return (
        <PrintPreview previewRef={prevRef} items={items} />
    )
}