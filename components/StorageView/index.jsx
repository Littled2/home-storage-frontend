'use client'

import styles from "./storage.module.css"

import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"
import { ItemCard } from "./ItemCard"
import Link from "next/link"


export function StorageView({ location, query=''  }) {

    const [ items, setItems ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const { pb } = usePocket()

    useEffect(() => {

        setLoading(true)

        let options = {
            sort: "created",
            expand: "location"
        }

        let qFilter = ""
        let lFilter = ""

        if(query !== "") {
            qFilter = `(name ~ '%${query}%' || description ~ '%${query}%')`
        }

        if(location && location !== "all-locations") {
            lFilter += `location = "${location}"`
        }

        let filter = ""

        if(qFilter && lFilter) {
            filter = qFilter + " && " + lFilter
        } else {
            if(qFilter) {
                filter = qFilter
            } else if(lFilter) {
                filter = lFilter
            }
        }

        if(filter !== "") {
            options.filter = filter
        }

        console.log({filter})

        pb.collection("items").getFullList(options)
        .then(i => {
            console.log({i})
            setItems(i)
            setLoading(false)
        })
        .catch(err => {
            console.error("Error getting storage search results", err)
            setLoading(false)
        })
    }, [location, query])

    return !(items.length === 0 && !loading) ? (
        <section className={styles.wrapper}>
            {
                loading && (
                    <center>Loading...</center>
                )
            }
            {
                items.map((item, i) => {
                    return <ItemCard item={item} key={i} />
                })
            }
        </section>
    ) : (
        <div className={styles.nothingHere}>
            <center>Nothing in your storage yet!</center>
            <center><Link href={"/new/item"}>Add something</Link></center>
        </div>
    )
}