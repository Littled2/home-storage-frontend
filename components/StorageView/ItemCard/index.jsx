'use client'

import Link from "next/link";
import styles from "./styles.module.css"
import { usePocket } from "@/contexts/PocketContext";

export function ItemCard({ item }) {

    const { pb } = usePocket()

    return (
        <Link href={"/storage/item/" + item?.id} className={styles.card}>

            <div>
                <h3>{item.name}</h3>
                <p className={styles.location}>{item?.expand?.location?.name}</p>
            </div>

            <div>
                <img className={styles.image} style={{ filter: "saturate(50%)", opacity: "0.95" }} src={pb.files.getUrl(item, item.image)} />
            </div>

        </Link>
    )
}