'use client'

import styles from "./link.module.css"
import { BsChevronRight, BsDoorClosed } from "react-icons/bs"
import { LocationSelect } from "@/components/LocationSelect"
import { useCallback, useEffect, useState } from "react"
import { usePocket } from "@/contexts/PocketContext"
import { SubLocationSelect } from "@/components/SubLocationSelect"

export function LocationInfo({ location, subLocationID, itemID }) {

    const { pb } = usePocket()

    const setItemLocation = useCallback(locID => {

        pb.collection("items").update(itemID, {
            location: locID
        })
        .then(() => {
            if(locID !== location?.id) {
                pb.collection("items").update(itemID, {
                    sub_location: ""
                })
            }
        })

    }, [pb])

    const setItemSubLocation = useCallback(locID => {

        pb.collection("items").update(itemID, {
            sub_location: locID
        })

    }, [pb])

    return (
        <div className={styles.outerWrapper}>
            <div>
                <h4>Location</h4>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.link}>
                    <BsDoorClosed />
                </div>

                <LocationSelect className={styles.selectLocation} selectedLocationID={location?.id} setSelectedLocationID={setItemLocation} />

                {
                    location ? (
                        <>
                            <div className={styles.link}>
                                <BsChevronRight />
                            </div>
                
                            <SubLocationSelect className={styles.selectLocation} locationID={location?.id} selectedSubLocationID={subLocationID} setSelectedSubLocationID={setItemSubLocation} />
                        </>
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}