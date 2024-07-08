'use client'

import { Sticker } from "./Sticker"
import styles from "./styles.module.css"

export function PreviewPage({ marginTop, marginBottom, marginRight, marginLeft, numRows, numCols, rowSpacing, colSpacing, items, previewRef }) {

    return (
        <section
            ref={previewRef}
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
                items.map(item => {
                    return (
                        <div className={styles.sticker}>
                            <Sticker item={item} />
                        </div>
                    )
                })
            }
        </section>
    )
}