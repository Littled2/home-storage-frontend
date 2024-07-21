'use client'

import Link from "next/link";
import styles from "./styles.module.css"
import { usePocket } from "@/contexts/PocketContext";
import { useState } from "react";
import { SubItemCard } from "./SubItemCard";

export function ItemCard({ item, selected, setSelected, dragged, setDragged, setRefreshCounter }) {

    const { pb } = usePocket()

    const [ dragOver, setDragOver ] = useState(false)

    return (
        <Link
            href={"/storage/item/" + item?.id}
            draggable={true}
            className={[
                styles.card,
                dragged?.id === item?.id ? styles.dragging : "",
                dragOver ? styles.dragOver : ""
            ].join(" ")}

            onDragStartCapture={e => {
                // e.preventDefault()
                e.stopPropagation()
                setDragged(item)
            }}

            onDragEnd={() => setDragged(null)}

            onDragOver={e => {

                e.preventDefault()
                
                if(dragged?.id === item?.id) return

                if(!dragOver) setDragOver(true)
            }}

            onDragLeave={() => setDragOver(false)}

            onDrop={e => {
                e.preventDefault()

                if(dragged?.id === item?.id) return

                setDragOver(false)

                pb.collection("items").update(dragged?.id, {
                    parent: item?.id
                })
                .then(() => {
                    
                    setRefreshCounter(c => c + 1)

                })
                .catch(err => console.error(err))
            }}

        
        >

            <div className={styles.infoWrapper}>
                <div className={styles.nameWrapper}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <input
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onClick={e => {
                            e.stopPropagation()

                            if(e.target.checked) {
                                setSelected(sel => [ ...sel, item.id ])
                            } else {
                                const sel = JSON.parse(JSON.stringify(selected))

                                sel.splice(sel.findIndex(i => i === item.id), 1)

                                setSelected(sel)
                            }
                        }}
                    />
                </div>

                <p className={styles.location}>{item?.expand?.location?.name} </p>
            </div>

            <div>
                <img className={styles.mobileImage} style={{ filter: "saturate(50%)", opacity: "0.95" }} src={pb.files.getUrl(item, item.image, { thumb: '100x100' })} />
                <img className={styles.image} style={{ filter: "saturate(50%)", opacity: "0.95" }} src={pb.files.getUrl(item, item.image, { thumb: '250x250' })} />
            </div>

            <div className={styles.subItems}>
                {
                    item?.expand?.items && item?.expand?.items.length > 0 && (
                        item?.expand?.items.map(i => {
                            return <SubItemCard item={i} key={"_" + i.id} />
                        })
                    )
                }
            </div>



        </Link>
    )
}