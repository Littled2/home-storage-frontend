'use client'

import styles from "./styles.module.css"
import { GoBackLink } from "@/components/GoBackLink";
import { NewItem } from "@/forms/NewItem";
import { NewItemMobile } from "@/forms/NewItemMobile";
import { useState } from "react";
import Camera from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import { BsArrowLeft, BsCamera } from "react-icons/bs";


export default function NewItemPage({ searchParams }) {

    const [ image, setImage ] = useState()

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    return (
        <section className={styles.wrapper}>

            <div className={styles.page1}>
                {
                    !image ? (
                        <Camera
                            idealFacingMode="environment"
                            onTakePhoto={dataUri => setImage(dataUri)}
      
                        />
                    ) : (
                        <img src={image} className={styles.imagePreview} onClick={() => setImage(null)} />
                    )
                }

            </div>

            <div className={styles.page2} style={{ top: !image ? "100%" : "20%" }}>
                {/* <button className={styles.retakeBtn} onClick={() => setImage(null)}>
                    <BsCamera />
                    <span>Retake photo</span>
                </button> */}

                {
                    image && (
                        <NewItemMobile image={dataURLtoFile(image)} />
                    )
                }

            </div>

        </section>
    )
}