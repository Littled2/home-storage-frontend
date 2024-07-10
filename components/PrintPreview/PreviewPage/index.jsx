'use client'

import { Sticker } from "./Sticker"
import styles from "./styles.module.css"
import { BsEyeSlash } from "react-icons/bs"

export function PreviewPage({ marginTop, marginBottom, marginRight, marginLeft, numRows, numCols, rowSpacing, colSpacing, items, setItems }) {

    return (
        <section
            className={styles.page}
            style={{
                paddingTop: marginTop,
                paddingBottom: marginBottom,
                paddingLeft: marginLeft,
                paddingRight: marginRight,
                gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                gridTemplateRows: `repeat(${numRows}, 1fr)`,
                rowGap: rowSpacing,
                columnGap: colSpacing
            }}
        >
            {
                items.map((item, i) => {
                    return item !== null ? (
                        <div className={styles.sticker} key={item?.id}>

                            <div className={styles.controls}>
                                <button onClick={() => {
                                    console.log(i)
                                    setItems(crnt => {
                                        crnt = JSON.parse(JSON.stringify(crnt))
                                        crnt.splice(i, 0, item)
                                        crnt[i] = null
                                        return crnt
                                    })
                                }}>
                                    <BsEyeSlash/>
                                </button>
                            </div>

                            <Sticker item={item} />
                        </div>
                    ) : (
                        <div></div>
                    )
                })
            }
        </section>
    )
}