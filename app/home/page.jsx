'use client'

import styles from "./account.module.css"
import Link from "next/link"
import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"
import { BsPerson, BsSearch } from "react-icons/bs"
import { LocationSelect } from "@/components/LocationSelect"

export default function AccountPage() {

    const { user, logout, pb } = usePocket()

    
    const [ itemsCount, setItemsCount ] = useState(0)
    const [ containersCount, setContainersCount ] = useState(0)


    useEffect(() => {

        if(!user) return

        pb.collection("items_count").getOne(user.activeLocation)
        .then(doc => setItemsCount(doc.count))

        pb.collection("containers_count").getOne(user.activeLocation)
        .then(doc => setContainersCount(doc.count))

    }, [user?.activeLocation])

    return (
        <section className={styles.page}>

            {/* <div className={styles.account}>
                <AccountBtn />
            </div> */}

            <div className={styles.top}>
                <h1>Hi there, {user?.name}</h1>
            </div>



            <div className={styles.statsWrapper}>

                <div className={styles.options}>

                    <Link href={"/"}>
                        <h1><BsSearch /></h1>
                        <small>Search</small>
                    </Link>

                    <Link href={"/account"}>
                        <h1><BsPerson /></h1>
                        <small>Account</small>
                    </Link>

                </div>

                <div className={styles.stats}>
                    <LocationSelect location={null} setLocation={() => {}} />

                    <div className={styles.statsInner}>

                        <div>
                            <h1>{itemsCount}</h1>
                            <p>Items</p>
                        </div>

                        <div>
                            <h1>{containersCount}</h1>
                            <p>Containers</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* <div className={styles.locations}>

                <Link href={"/new/location"}>
                    <span>Add new location</span>
                    <BsHouse />
                </Link>

            </div> */}

        </section>
    )
}