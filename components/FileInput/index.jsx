'use client'

import styles from "./styles.module.css"

import { Preview } from "./Preview"
import { useState } from "react"

export function FileInput({ setValue }) {

    const isEmpty = (obj) => Object.keys(obj).length === 0

    const [ files, setFiles ] = useState([])
    const [ fileDetails, setFileDetails ] = useState({})

    const filesChanged = (e) => {
        let fileArray = [...e.target.files]
        setFiles(fileArray)
        let details = fileDetails
        details.count = fileArray.length
        details.size = sumFileSize(fileArray)
        setFileDetails(details)
        setValue(fileArray)
    }

    const sumFileSize = (fileArray) => {
        let total = 0
        for (let i = 0; i < fileArray.length; i++) {
            const f = fileArray[i]
            total += f.size
        }
        return (total / 1000000).toFixed(2)
    }
    

    return (
        <>
            <label for="fileInput" className={styles.fileInput}>
                <input type="file" name="fileInput" id="fileInput" accept="image/*" onChange={filesChanged} capture multiple />

                <div className={styles.fileInputInner}>
                    <img src={"/upload.png"} className={styles.fileIcon} />
                    <div>
                        <h4>{isEmpty(fileDetails) ? "No" : fileDetails.count } Images Selected</h4>
                        <p>{fileDetails.size ? fileDetails.size : 0} MB (Max 6 MB)</p>
                    </div>
                </div>
            </label>
            <div className={styles.filePreview}>
                {files.map((file, i) =>  <Preview file={file} key={i} />)}
            </div>
        </>
    )
}