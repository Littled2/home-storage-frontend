'use client'

import { BsFullscreen, BsPlus, BsPrinter, BsTrash } from "react-icons/bs"
import { EditText } from "../EditText"
import styles from "./styles.module.css"
import { useEffect, useRef, useState } from "react"
import { usePocket } from "@/contexts/PocketContext"
import { SubLocationItem } from "./SubLocationItem"
import { MapView } from "./MapView"
import Link from "next/link"

export function LocationItem({ location }) {

    const [ mapOpen, setMapOpen ] = useState(false)
    const mapPopupWrapper = useRef()
    
    const [ subLocations, setSubLocations ] = useState()
    const [ c, sc ] = useState(0)

    const { pb, user } = usePocket()

    useEffect(() => {
        pb.collection("sub_locations").getFullList({
            filter: `location = "${location.id}"`
        })
        .then(setSubLocations)
    }, [c])

    const newSubLocation = () => {
        pb.collection("sub_locations").create({
            location: location.id,
            name: "Sub location",
            user: user.id
        })
        .then(() => {
            sc(c + 1)
        })
    }

    return (
        <div className={styles.location}>
                {
                    location?.map && (
                        <div className={styles.mapWrapper}>

                            <MapView map={location?.map} />

                            <div className={styles.mapBtnsCont}>
                                <button onClick={() => setMapOpen(true)}>
                                    <BsFullscreen />
                                </button>
                            </div>

                            {
                                mapOpen && (
                                    <section
                                        className={styles.mapOpenWrapper}
                                        onClick={e => {
                                            if(e.target === mapPopupWrapper.current) {
                                                setMapOpen(false)
                                            }
                                        }}
                                    >
                                        <div className={styles.mapOpenInner}>
                                            <div>
                                                <div className={styles.mapOpenMap}>
                                                    <MapView map={location?.map} />
                                                </div>
                                                <div className={styles.mapBtnsCont}>
                                                    <button>Undo</button>
                                                    <button>Clear</button>
                                                </div>
                                            </div>

                                            <h2>Plan view of {location?.name}</h2>
                                        </div>
                                    </section>
                                )
                            }
                        </div>
                    )
                }
            <div className={styles.infoInner}>
                <div>
                    <h3 className={styles.name}>
                        <EditText collection={"locations"} field={"name"} id={location?.id} text={location?.name}></EditText>

                        <div className={styles.btnsCont}>

                            <Link href={{ pathname: "/print", query: { locationID: location?.id }}} className={styles.btn}>
                                <BsPrinter />
                            </Link>

                            <button className={styles.btn} onClick={async () => {
                                for (const subLoc of subLocations) {
                                    await pb.collection("sub_locations").delete(subLoc.id)
                                }

                                await pb.collection("locations").delete(location?.id)
                            }}>
                                <BsTrash />
                            </button>

                        </div>

                    </h3>
                    <h6 className={styles.count}>{location?.items} <small>items</small></h6>
                </div>
                <div>
                    <ul className={styles.list}>
                        {
                            subLocations?.map((loc) => <SubLocationItem sc={sc} subLocation={loc} key={loc.id} />)
                        }
                    </ul>
                </div>
                <button className={styles.newSubLocation} onClick={newSubLocation}>
                    <span>New sub-location</span>
                    <BsPlus />
                </button>
            </div>
        </div>
    )
}