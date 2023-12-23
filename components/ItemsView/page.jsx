'use client'

import { usePocket } from "@/contexts/PocketContext"
import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./items.module.css"
import { MdAdd, MdEdit } from "react-icons/md"
import { RxExit } from "react-icons/rx"
import { FaCross } from "react-icons/fa6"
import { BsX } from "react-icons/bs"

export function ItemsView({ containerID }) {

    const { pb, user } = usePocket()

    const [ items, setItems ] = useState()

    const [ c, sc ] = useState(0)

    const itemRef = useRef()

    useEffect(() => {
        pb.collection("items").getFullList({
            filter: `gid = '${user.gid}' && container = '${containerID}'`
        })
        .then(i => {
            setItems(i)
        })

        pb.collection('items').subscribe('*', e => {
            
            if(e.action === "create") {
                setItems(items => [ ...items, e.record ])
            } else {
                sc(c + 1)
            }

        })

        return () => pb.collection('items').unsubscribe('*')
    }, [c])


    const addItem = useCallback(() => {
        pb.collection("items").create({
            name: itemRef.current.value,
            description: '',
            container: containerID,
            gid: user.gid
        })
        itemRef.current.value = ""
    }, [])


    const removeItem = useCallback((id) => {
        pb.collection("items").delete(id)
    }, [])

    function keyPress(e) {
        if(e.keyCode === 13) {
            addItem()
        }
    }


    return (
        <article className={styles.wrapper}>
            
            <ul className={styles.items}>
                {
                    items?.map(item => {
                        return (
                            <li className={styles.item} key={item.id}>
                                <span>{item.name}</span>
                                <button onClick={() => removeItem(item.id)}>
                                    <BsX />
                                </button>
                            </li>
                        )
                    })
                }
                {
                    items?.length === 0 ? (
                        <div className={styles.nothingYet}>
                            <p>No items listed yet</p>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </ul>

            <div className={styles.controls}>


                <input className={styles.input} type="text" placeholder="Enter a new item" ref={itemRef} onKeyDown={keyPress} />
                <button className={styles.addBtn} onClick={addItem}>
                    <span>Add</span>
                    <MdAdd />
                </button>


            </div>

        </article>
    )
}