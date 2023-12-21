'use client'

import { usePocket } from "@/contexts/PocketContext"
import { useEffect } from "react"

export function ItemsView() {

    const { pb, user } = usePocket()

    useEffect(() => {
        pb.collection("items").getFullList({
            filter: "gid = " + user.gid
        })
        .then(items => console.log(items))
    }, [])

    return (
        <article>
            <ul>

            </ul>
        </article>
    )
}