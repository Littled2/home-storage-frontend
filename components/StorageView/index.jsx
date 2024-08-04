'use client'

import styles from "./storage.module.css"

import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useRef, useState } from "react"
import { ItemCard } from "./ItemCard"
import Link from "next/link"
import { BsPrinter } from "react-icons/bs"


export function StorageView({ location, subLocation, query=''  }) {

    const itemsPerPage = 25

    const [ items, setItems ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const [ selected, setSelected ] = useState([])

    const [ dragged, setDragged ] = useState()

    const [ refreshCounter, setRefreshCounter ] = useState(0)

    const container = useRef()

    const { pb } = usePocket()


    const handleScroll = () => {

      const scrollTop = document.querySelector("main").scrollTop
      const scrollHeight = document.querySelector("main").scrollHeight
      const height = document.querySelector("main").getBoundingClientRect().height

      if (Math.round(scrollHeight - scrollTop - height) === 0) {
        setCurrentPage(c => c + 1)
      }
    }

    useEffect(() => {

        document.querySelector("main").addEventListener('scroll', handleScroll)

        return () => {
            document.querySelector("main").removeEventListener('scroll', handleScroll)
        }

    }, [])



    useEffect(() => {

        if(loading) return

        setLoading(true)

        let options = {
            sort: "-created",
            expand: "location, sub_location, items(parent)"
        }

        let filters = []

        if(query !== "") {
            filters.push(`name ~ '%${query}%' || description ~ '%${query}%'`)
        }

        if(location && location !== "all-locations") {
           filters.push(`location = "${location}"`)
        }
        
        if(subLocation && subLocation !== "all-sub-locations") {
            filters.push(`sub_location = "${subLocation}"`)
        }

        options.filter = filters.join(" && ")

        pb.collection("items").getList(
            currentPage,
            itemsPerPage,
            options
        )
        .then(i => {
            console.log(i.items)
            setItems([ ...items, ...i.items ])
            setLoading(false)
        })
        .catch(err => {
            console.error("Error getting storage search results", err)
            setLoading(false)
        })
    }, [location, subLocation, query, refreshCounter, currentPage])


    useEffect(() => {
        setItems([])
        setCurrentPage(1)
    }, [location, subLocation, query])



    return !(items.length === 0 && !loading) ? (
        <section className={styles.wrapper} ref={container}>
            {
                items.map((item, i) => {
                    return <ItemCard item={item} key={i} selected={selected} setSelected={setSelected} dragged={dragged} setDragged={setDragged} setRefreshCounter={setRefreshCounter} />
                })
            }

            {
                loading && (
                    <center>Loading...</center>
                )
            }

            {
                selected.length > 0 && (
                    <div className={styles.selectedInfo}>
                        <div>
                            <p>Selected <b>{selected?.length}</b> items</p>
                            {/* <button onClick={() => setSelected([])} className={styles.removeSelectedBtn}>Delete selected</button> */}
                        </div>
        
                        <Link
                            className={styles.printBtn}
                            href={{
                                pathname: "/print",
                                query: {
                                    items: JSON.stringify(selected)
                                }
                            }}>
                            <BsPrinter />
                            <span>Print selected</span>
                        </Link>
                    </div>
                )
            }
        </section>
    ) : (
        <div className={styles.nothingHere}>
            <center>Nothing in your storage yet!</center>
            <center><Link href={"/new/item"}>Add something</Link></center>
        </div>
    )
}