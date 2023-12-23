'use client'

import { EditText } from "@/components/EditText"
import { EditTextLong } from "@/components/EditTextLong"
import { ItemsView } from "@/components/ItemsView/page"
import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"
import { BsBox, BsQrCode } from "react-icons/bs"

import styles from "./page.module.css"

export default function ContainerView({ params }) {

    const { pb } = usePocket()

    const [ container, setContainer ] = useState()

    useEffect(() => {
        pb.collection("containers").getOne(params.containerID, {
            expand: "place"
        })
        .then(c => {
            console.log(c)
            setContainer(c)
        })
    }, [])

    return (
        <section>

            <div className={styles.top}>
                <h1 className="icon-heading">
                    <BsBox />
                    {
                        container ? (
                            <EditText text={container.name} collection={"containers"} id={container.id} field={"name"} />
                        ) : (
                            <></>
                        )
                    }
                </h1>

                <button>
                    <h1><BsQrCode /></h1>
                </button>
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