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
            filter: `gid = '${user.gid}' && name ~ '%${query}%'`,
            expand: "container,places(container.place)"
        })
        .then(res => {
            console.log(res.items)
            setResults(res.items)
        })

    }, [query])

    return (
        <section>

            <div className={styles.top}>
                <p>Results for: <b>{query}</b></p>
            </div>

            <div className={styles.results}>
                {
                    results.map(res => {
                        return (
                            <ItemResult item={res} image={res?.image} name={res.name} containerName={res.expand.container.name} containerID={res.container} />
                        )
                    })
                }
            </div>

        </section>
    )
}