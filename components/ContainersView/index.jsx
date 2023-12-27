import Link from "next/link";
import { Container } from "./Container";
import styles from "./ContainersView.module.css"
import { useEffect, useState } from "react";
import { usePocket } from "@/contexts/PocketContext";
import { BsPlus } from "react-icons/bs";

export function ContainersView({ placeID, locationID }) {

    const [ containers, setContainers ] = useState([])

    const { pb, user } = usePocket()

    useEffect(() => {

        pb.collection("containers").getFullList({
            filter: placeID ? `gid = '${user.gid}' && place = '${placeID}'` : `gid = '${user.gid}' && place.location = '${locationID}'`,
            expand: "place"
        })
        .then(c => {
            console.log(c)
            setContainers(c)
        })

    }, [placeID, locationID])

    return (
        <article>

            <div className={styles.top}>
                <h3>Containers</h3>
                <Link className={styles.topBtn} href={{ pathname: "/new/container", query: { place: placeID } }}>
                    <span>Add container</span>
                    <BsPlus />
                </Link>
            </div>

            <div className={styles.containers}>
                {
                    containers.map((c,i) => <Container key={i} name={c.name} id={c.id} place={c.expand.place} />)
                }
            </div>

            {/* <div className={styles.btnCont}>
                <button>
                    <span>Add container</span>
                    <BsPlus />
                </button>
            </div> */}

        </article>
    )
}