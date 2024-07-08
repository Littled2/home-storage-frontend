'use client'

import { usePocket } from "@/contexts/PocketContext"
import { PreviewPage } from "./PreviewPage"
import styles from "./styles.module.css"
import { useState } from "react"
import { useEffect } from "react"

export function PrintPreview({ items, previewRef }) {

    const { user } = usePocket()

    const [ pagesOfStickers, setPagesOfStickers ] = useState([])

    useEffect(() => {

        let pages = []

        let temp_items = JSON.parse(JSON.stringify(items))

        let current_page_count = 0
        let current_page = []

        while (temp_items.length > 0) {

            let item = temp_items.splice(0, 1)[0]


            // If this page is full, overflow to a new page
            if(current_page_count === user.printSettings?.numRows * user.printSettings?.numCols) {

                pages.push(current_page)

                current_page = []
                current_page_count = 0
            }

            
            current_page.push(item)
            current_page_count++
        }

        if(current_page.length > 0) {
            pages.push(current_page)
        }


        setPagesOfStickers(pages)

        console.log({user})
        

    }, [ items, JSON.stringify(user.printSettings) ])

    return user ? (
        <section className={styles.wrapper}>

            <div className={styles.info}>
                <p>{pagesOfStickers.reduce((acc, i) => acc + i.length, 0)} items</p>
            </div>

            {
                pagesOfStickers.map(items => {
                    return (
                        <PreviewPage
                            marginTop={user.printSettings?.margin?.top}
                            marginBottom={user.printSettings?.margin?.bottom}
                            marginLeft={user.printSettings?.margin?.left}
                            marginRight={user.printSettings?.margin?.right}
                            colSpacing={user.printSettings?.colSpacing}
                            rowSpacing={user.printSettings?.rowSpacing}
                            numCols={user.printSettings?.numCols}
                            numRows={user.printSettings?.numRows}
                            items={items}
                            previewRef={previewRef}
                        />
                    )
                })
            }


        </section>
    ) : (
        <></>
    )
}