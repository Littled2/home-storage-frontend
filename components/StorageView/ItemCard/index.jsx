'use client'

import Link from "next/link";
import styles from "./styles.module.css"
import { usePocket } from "@/contexts/PocketContext";

export function ItemCard({ item, selected, setSelected }) {

    const { pb } = usePocket()

    return (
        <Link href={"/storage/item/" + item?.id} className={styles.card}>

            <div>
                <div className={styles.nameWrapper}>
                    <h3>{item.name}</h3>
                    <input
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onClick={e => {
                            e.stopPropagation()
                            setSelected(sel => [ ...sel, item.id ])
                        }}
                    />
                </div>

                <p className={styles.location}>{item?.expand?.location?.name}</p>
            </div>

            <div>
                <img className={styles.mobileImage} style={{ filter: "saturate(50%)", opacity: "0.95" }} src={pb.files.getUrl(item, item.image, { thumb: '100x100' })} />
                <img className={styles.image} style={{ filter: "saturate(50%)", opacity: "0.95" }} src={pb.files.getUrl(item, item.image, { thumb: '250x250' })} />
            </div>

        </Link>
    )
}