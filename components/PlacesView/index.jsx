import styles from "./PlacesView.module.css"
import { Place } from "./Place";
import { useEffect, useState } from "react";
import { usePocket } from "@/contexts/PocketContext";

export function PlacesView({ locationID, capped }) {

    const { pb, user } = usePocket()

    const [ places, setPlaces ] = useState()

    useEffect(() => {
        console.log("GeTTING PLACES")
        pb.collection("places").getFullList({
            filter: `gid = '${user.gid}' && location = '${locationID}'`
        })
        .then(p => {
            console.log("PLACES", p)
            setPlaces(p)
        })
    }, [locationID])

    return (
        <article>

            <div className={styles.top}>
                <h3>Rooms</h3>
            </div>

            <div className={styles.containers}>
                {
                    places?.map(p => <Place key={p.id} id={p.id} name={p.name} />)
                }
            </div>

        </article>
    )
}