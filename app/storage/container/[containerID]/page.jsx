'use client'

import { EditText } from "@/components/EditText"
import { EditTextLong } from "@/components/EditTextLong"
import { ItemsView } from "@/components/ItemsView/page"
import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"
import { BsBox, BsHouse, BsQrCode } from "react-icons/bs"

import styles from "./page.module.css"
import { MdHome, MdRoom } from "react-icons/md"
import Link from "next/link"
import { LocationLink } from "@/components/links/Location"
import { PlaceLink } from "@/components/links/Place"

export default function ContainerView({ params }) {

    const { pb } = usePocket()

    const [ container, setContainer ] = useState()
    const [ place , setPlace ] = useState()
    const [ location , setLocation ] = useState()

    useEffect(() => {
        pb.collection("containers").getOne(params.containerID, {
            expand: "place"
        })
        .then(c => {
            console.log(c)
            setContainer(c)
            pb.collection("places").getOne(c.place, { expand: "location" })
            .then(p => {
                setPlace(p)
                setLocation(p.expand.location)
            })
        })
    }, [])

    return (
        <section>

            <div className={styles.top}>
                <div className={styles.heading}>
                    {/* <BsBox /> */}
                    <div>
                        <small>Container:</small>
                        <h1>
                            {
                                container ? (
                                    <EditText text={container.name} collection={"containers"} id={container.id} field={"name"} />
                                ) : (
                                    <></>
                                )
                            }
                        </h1>
                    </div>
                </div>

                <Link href={{ pathname:`/storage/container/${params.containerID}/sticker`, query: { name: container?.name }}}>
                    <h1><BsQrCode /></h1>
                </Link>
            </div>

            <div className={styles.locationInfoCont}>
                <LocationLink href={`/storage/location/${location?.id}`}>{location?.name}</LocationLink>
                <PlaceLink href={`/storage/place/${place?.id}`}>{place?.name}</PlaceLink>
            </div>


            <br />

            <p>
                {
                    container ? (
                        <EditTextLong text={container.description} collection={"containers"} id={container.id} field={"description"} />
                    ) : (
                        <></>
                    )
                }
            </p>

            <br />

            <hr />

            <br />

            {
                container ? (
                    <ItemsView containerID={container?.id} />
                ) : (
                    <></>
                )
            }


        </section>
    )
}