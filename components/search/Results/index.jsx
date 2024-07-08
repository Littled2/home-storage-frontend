'use client'

import { useEffect, useState } from "react"
import { Card } from "./Card"
import styles from "./results.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { ItemResult } from "./Item"
import { ItemCard } from "@/components/StorageView/ItemCard"

export function Results({ query }) {

    const { pb, user } = usePocket()

    const [ results, setResults ] = useState([])

    useEffect(() => {

        if(!user) return

        setResults([])

        if(query.length === 0) return

        pb.collection("items").getList(1, 25, {
            filter: `name ~ '%${query}%' || description ~ '%${query}%'`
        })
        .then(res => {
            console.log(res.items)
            setResults(res.items)
        })

    }, [query, user])

    return (
        <section>

            <div className={styles.results}>
                {
                    results.map((item, i) => {
                        return (
                            <ItemCard item={item} key={i} />
                        )
                    })
                }
            </div>

        </section>
    )
}