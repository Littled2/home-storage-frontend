'use client'

import { LocationSelect } from "@/components/LocationSelect"
import styles from "./storage.module.css"
import { ContainersView } from "@/components/ContainersView"
import { PlacesView } from "@/components/PlacesView"
import { usePocket } from "@/contexts/PocketContext"
import Link from "next/link"
import { BsPlus, BsPrinter } from "react-icons/bs"
import { StorageToolbar } from "../components/StorageToolbar"
import { StorageView } from "@/components/StorageView"
import { useState } from "react"

export default function StoragePage() {

    const { user } = usePocket()

    const [ query, setQuery ] = useState("")
    const [ location, setLocation ] = useState()

    const [ itemsCount, setItemsCount ] = useState(0)

    return (
        <section className={styles.page}>

            {/* <h1 className={styles.mobileHeading}>Everything in your storage</h1> */}

            <StorageToolbar query={query} setQuery={setQuery} setLocation={setLocation} />

            <StorageView location={location} query={query} />

            <Link href={"/new/item"} className={styles.newItemBtnMobile}>
                <img src="/add.png" />
                <span>Add Item</span>
            </Link>

            <Link href={"/new/item/desktop"} className={styles.newItemBtnDesktop}>
                <img src="/add.png" />
                <span>Add Item</span>
            </Link>

            {/* <Link href={"/print-labels/" + user?.activeLocation}><BsPrinter /> Print container labels</Link> */}

        </section>
    )
}