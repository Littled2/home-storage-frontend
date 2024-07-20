'use client'

import { usePocket } from "@/contexts/PocketContext"
import styles from "./styles.module.css"
import Link from "next/link"

export function SubItemCard({ item }) {

    const { pb } = usePocket()

    return (
        <Link href={"/storage/item/" + item?.id} className={styles.card}>
            <img className={styles.image} style={{ filter: "saturate(50%)", opacity: "0.95" }} src={pb.files.getUrl(item, item.image, { thumb: '250x250' })} />
            <p className={styles.name}>{item?.name}</p>
        </Link>
    )
}