'use client'

import { useEffect, useState } from "react"
import { Card } from "./Card"
import styles from "./results.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { ItemResult } from "./Item"

export function Results({ query }) {

    const { pb, user } = usePocket()

    const [ results, setResults ] = useState([])

    useEffect(() => {

        pb.collection("items").getList(1, 25, {
            filter: `gid = '${user.gid}' && name ~ '${query}%'`,
            expand: "container"
        })
        .then(res => {
            setResults(res.items)
        })

    }, [query])

    return (
        <section className={styles.cards}>

            {
                results.map(res => {
                    return (
                        <ItemResult name={res.name} containerName={res.expand.container.name} containerID={res.container} />
                    )
                })
            }

        </section>
    )
}