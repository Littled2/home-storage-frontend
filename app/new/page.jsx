'use client'

import Link from "next/link";
import styles from "./new.module.css"
import { FaArrowRight } from "react-icons/fa6";
import { SelectActiveLocation } from "@/components/SelectActiveLocation";
import { useEffect, useState } from "react";
import { usePocket } from "@/contexts/PocketContext";
import { LocationSelect } from "@/components/LocationSelect";

export default function NewPage() {

    const [ location, setLocation ] = useState()

    const { pb, user } = usePocket()

    useEffect(() => {

        if(!user) return

        pb.collection("locations").getOne(user.activeLocation)
        .then(l => setLocation(l))

    }, [user])

    return (
        <section className={styles.page}>

            <LocationSelect />

            <h2 className="page-heading">Add something to {location?.name}</h2>

            {/* <SelectActiveLocation /> */}

            <div className={styles.btns}>

                <Link href={"/new/container"}>
                    <span>Container</span>
                    <FaArrowRight />
                </Link>

                <Link href={"/new/room"}>
                    <span>Room</span>
                    <FaArrowRight />
                </Link>

            </div>

        </section>
    )
}