'use client'

import { EditText } from "@/components/EditText"
import { EditTextLong } from "@/components/EditTextLong"
import { ItemsView } from "@/components/ItemsView/page"
import { usePocket } from "@/contexts/PocketContext"
import { useCallback, useEffect, useState } from "react"
import { BsArrowDown, BsArrowUp, BsBox, BsHouse, BsPrinter, BsQrCode, BsTrash } from "react-icons/bs"

import styles from "./page.module.css"
import { MdEdit, MdHome, MdRoom } from "react-icons/md"
import Link from "next/link"
import { LocationInfo } from "@/components/links/Location"
import { useRouter } from "next/navigation"

export default function ItemViewPage({ params }) {

    const { pb } = usePocket()

    const [ item, setItem ] = useState()
    const [ location, setLocation ] = useState()
    const [ subLocationID, setSubLocationID ] = useState()

    const router = useRouter()


    useEffect(() => {

        pb.collection('items').getOne(params.itemID, { expand: "location,sub_location" })
        .then(i => {
            setItem(i)
            setLocation(i.expand?.location)
            setSubLocationID(i?.sub_location)
        })

        pb.collection('items').subscribe(params.itemID, e => {
            setItem(e.record)
            setLocation(e.record.expand?.location)
            setSubLocationID(e.record?.sub_location)
        }, {
            expand: "location,subLocation"
        })

        return () => pb.collection('items').unsubscribe()
    }, [])

    const changeImage = useCallback(() => {
        const imgInput = document.createElement("input")
        imgInput.setAttribute("type", "file")

        imgInput.style.display = "none"
        document.body.append(imgInput)

        imgInput.oninput = e => {

            if(e.target.files.length === 0) return

            let fd = new FormData()
            fd.append("image", e.target.files[0])

            pb.collection("items").update(params.itemID, fd)
        }

        imgInput.click()
    })

    const deleteImage = useCallback(() => {
        pb.collection("items").update(params.itemID, { image: null})
    })

    return (
        <section className={styles.page}>

            <div className={styles.top}>
                <div>
                    <h1 className={styles.heading}>
                        {
                            item ? (
                                <EditText text={item?.name} collection={"items"} id={item?.id} field={"name"} />
                            ) : (
                                <></>
                            )
                        }
                    </h1>
                </div>
                <button className={styles.deleteBtn} onClick={() => {
                    pb.collection("items").delete(params?.itemID)
                    .then(() => {
                        router.replace("/")
                    })
                }}>
                    <BsTrash />
                </button>
            </div>

            <div className={styles.pageRow}>
                <div className={styles.pageCol}>
                    <div>
                        {
                            location !== null ? (
                                <LocationInfo itemID={params.itemID} location={location} subLocationID={subLocationID} />
                            ) : (
                                <></>
                            )
                        }
                    </div>

                    <div>
                        <div className={styles.imageWrapper}>
                            <div className={styles.imageTop}>
                                <h4>Image</h4>
                                <div className={styles.imageToolbar}>
                                    <button onClick={() => changeImage()}><MdEdit /></button>
                                    {
                                        item?.image ? (
                                            <button onClick={() => deleteImage()}><BsTrash /></button>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                            </div>

                            {
                                item?.image ? (
                                    <img style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }} src={pb.files.getUrl(item, item?.image)} alt="Container photo" />
                                ) : (
                                    <></>
                                )
                            }

                        </div>
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <div className={styles.pageCol}>
                        <div className={styles.desc}>
                            <div className={styles.descTop} >
                                <h4>Notes</h4>
                            </div>
                            <div className={styles.descBtm}>
                                <p>
                                    {
                                        item ? (
                                            <EditTextLong text={item?.description} collection={"items"} id={item?.id} field={"description"} />
                                        ) : (
                                            <></>
                                        )
                                    }
                                </p>
                            </div>
                        </div>

                        <div>
                            <Link className={styles.printLink} href={{ pathname:`/print`, query: { itemID: item?.id }}}>
                                <BsPrinter />
                                <span>Print QR Code</span>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>

        </section>
    )
}