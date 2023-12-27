'use client'

import { usePocket } from "@/contexts/PocketContext"
import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./items.module.css"
import { MdAdd, MdEdit } from "react-icons/md"
import { RxExit } from "react-icons/rx"
import { FaCross } from "react-icons/fa6"
import { BsImage, BsX } from "react-icons/bs"
import Compressor from "compressorjs"

export function ItemsView({ containerID }) {

    const { pb, user } = usePocket()

    const [ items, setItems ] = useState()

    const [ c, sc ] = useState(0)

    const [ image, setImage ] = useState()
    const [ preview, setPreview ] = useState()

    const fileInputRef = useRef()

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
            container: containerID,
            gid: user.gid
        })
        .then((item) => {

            if(!image) {
                itemRef.current.value = ""
                setImage(null)
                setPreview(null)
                return
            }

            const fd = new FormData()
            fd.append("image", image)

            pb.collection("items").update(item.id, fd)
            .then(() => {
                itemRef.current.value = ""
                setImage(null)
                setPreview(null)
            })
        })
    }, [image, preview])


    const removeItem = useCallback((id) => {
        pb.collection("items").delete(id)
    }, [])

    function keyPress(e) {
        if(e.keyCode === 13) {
            addItem()
        }
    }

    function fileChange(e) {
        if(e.target.files.length !== 0) {
            new Compressor(e.target.files[0], {
                maxWidth: 480,
                maxHeight: 480,
                success: res => {
                    setImage(res)
                    setPreview(URL.createObjectURL(res))
                }
            })
        }
    }


    return (
        <article className={styles.wrapper}>
            
            <ul className={styles.items}>
                {
                    items?.map(item => {
                        return (
                            <li className={styles.item} key={item.id}>
                                <div className={styles.itemInner}>
                                    {
                                        item?.image ? (
                                            <img src={pb.files.getUrl(item, item.image, { thumb: '120x120' })}/>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    <span>{item.name}</span>
                                </div>
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

                <input type="file" accept="image/*" ref={fileInputRef} hidden="true" onChange={(e) => fileChange(e)} />
                
                <button className={styles.addBtn} onClick={() => fileInputRef.current.click()}>
                    <BsImage />
                </button>

                <input className={styles.input} type="text" placeholder="Enter a new item" ref={itemRef} onKeyDown={keyPress} />
                <button className={styles.addBtn} onClick={addItem}>
                    <span>Add</span>
                    <MdAdd />
                </button>


            </div>
            
            {
                image ? (
                    <div className={styles.img}>
                        <button onClick={() => {fileInputRef.current.value = null; setImage(null); setPreview(null)}}><BsX /></button>
                        <img src={preview} />
                    </div>
                ) : (
                    <></>
                )
            }

        </article>
    )
}