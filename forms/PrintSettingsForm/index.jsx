'use client'

import { useCallback, useRef } from "react"
import styles from "../forms.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function PrintSettingsForm() {

    const { pb, user } = usePocket()

    const [ printSettings, setPrintSettings ] = useState(user.printSettings)
    const [ c, sc ] = useState(0)

    useEffect(() => {

        pb.collection("users").update(user.id, {
            printSettings: printSettings
        })
        .catch(err => console.warn(err))

    }, [ c ])


    return (
        <section className={styles.form}>

            <div className={styles.formRow}>
                <div className={styles.formItem}>
                    <div>
                        <label>Number of rows</label>
                    </div>
                    <input min={0} type="number" value={printSettings?.numRows}
                        onInput={e => {
                            setPrintSettings(p => {
                                p.numRows = parseInt(e.target.value)
                                return p
                            })
                            setTimeout(() => sc(c + 1), 50)
                        }}
                    />
                </div>

                <div className={styles.formItem}>
                    <div>
                        <label>Number of columns</label>
                    </div>
                    <input min={0} type="number" value={printSettings?.numCols}
                        onInput={e => {
                            setPrintSettings(p => {
                                p.numCols = parseInt(e.target.value)
                                return p
                            })
                            setTimeout(() => sc(c + 1), 50)
                        }}
                    />
                </div>

                <div className={styles.formItem}>
                    <div>
                        <label>Spacing between rows</label>
                    </div>
                    <input type="text" value={printSettings?.rowSpacing}
                        onInput={e => {
                            setPrintSettings(p => {
                                p.rowSpacing = e.target.value
                                return p
                            })
                            setTimeout(() => sc(c + 1), 50)
                        }}
                    />
                </div>

                <div className={styles.formItem}>
                    <div>
                    <label>Spacing between columns</label>
                    </div>
                    <input type="text" value={printSettings?.colSpacing}
                        onInput={e => {
                            setPrintSettings(p => {
                                p.colSpacing = e.target.value
                                return p
                            })
                            setTimeout(() => sc(c + 1), 50)
                        }}
                    />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formItem}>
                    <div>
                        <label>Margin top</label>
                    </div>
                    <input type="text" value={printSettings?.margin?.top}
                        onInput={e => {
                            setPrintSettings(p => {
                                p.margin.top = e.target.value
                                return p
                            })
                            setTimeout(() => sc(c + 1), 50)
                        }}
                    />
                </div>

                <div className={styles.formItem}>
                    <div>
                        <label>Margin bottom</label>
                    </div>
                    <input type="text" value={printSettings?.margin?.bottom}
                        onInput={e => {
                            setPrintSettings(p => {
                                p.margin.bottom = e.target.value
                                return p
                            })
                            setTimeout(() => sc(c + 1), 50)
                        }}
                    />
                </div>

                <div className={styles.formItem}>
                    <div>
                        <label>Margin left</label>
                    </div>
                    <input type="text" value={printSettings?.margin?.left}
                        onInput={e => {
                            setPrintSettings(p => {
                                p.margin.left = e.target.value
                                return p
                            })
                            setTimeout(() => sc(c + 1), 50)
                        }}
                    />
                </div>

                <div className={styles.formItem}>
                    <div>
                    <label>Margin right</label>
                    </div>
                    <input type="text" value={printSettings?.margin?.right}
                        onInput={e => {
                            setPrintSettings(p => {
                                p.margin.right = e.target.value
                                return p
                            })
                            setTimeout(() => sc(c + 1), 50)
                        }}
                    />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formItem}>
                    <div>
                        <label>Font size</label>
                    </div>
                    <input min={0} type="number" value={printSettings?.fontSize}
                        onInput={e => {
                            setPrintSettings(p => {
                                p.fontSize = parseInt(e.target.value)
                                return p
                            })
                            setTimeout(() => sc(c + 1), 50)
                        }}
                    />
                </div>
            </div>

        </section>
    )
}