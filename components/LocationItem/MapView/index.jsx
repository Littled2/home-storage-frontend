'use client'

import { useEffect, useRef, useState } from "react"
import styles from "./styles.module.css"
import { usePocket } from "@/contexts/PocketContext"

export function MapView({ location, map }) {

    const canvas = useRef()

    const [ width, setWidth ] = useState()
    const [ height, setHeight ] = useState()
    const [ ctx, setCtx ] = useState()
    const [ currentLine, setCurrentLine ] = useState([])
    const [ tracking, setTracking ] = useState(false)

    const [ image, setImage ] = useState(new ImageControl())

    const { pb } = usePocket()

    useEffect(() => {

        if(!canvas) return

        setWidth(canvas.current.getBoundingClientRect().width)
        setHeight(canvas.current.getBoundingClientRect().height)

        setCtx(canvas.current.getContext("2d"))

    }, [canvas])

    function getMousePosition(event) {
        const rect = canvas.current.getBoundingClientRect();
        return [
            event.clientX - rect.left,
            event.clientY - rect.top
        ]
    }

    function drawLine(){
        ctx.beginPath()
        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.lineWidth = 1
        for (let i = 0; i < currentLine.length-1; i++) {
                ctx.moveTo(currentLine[i][0], currentLine[i][1])
                ctx.lineTo(currentLine[i+1][0], currentLine[i+1][1])
        }
        ctx.stroke()
    }

    function clear() {
        ctx.clearRect(0, 0, width, height);
    }

    function save() {
        pb.collection("locations").update(location?.id, {
            map: ""
        })
    }

    return (
        <canvas
            ref={canvas}
            className={styles.canvas}
            width={width}
            height={height}

            onMouseDown={e => {
                setTracking(true)
                setCurrentLine(line => [ ...line, getMousePosition(e) ])
            }}
            onTouchStart={e => {
                setTracking(true)
                setCurrentLine(line => [ ...line, getMousePosition(e) ])
            }}

            onMouseMove={e => {
                if(tracking) {
                    setCurrentLine(line => [ ...line, getMousePosition(e) ])
                    drawLine()
                }
            }}
            onTouchMove={e => {
                if(tracking) {
                    setCurrentLine(line => [ ...line, getMousePosition(e) ])
                    drawLine()
                }
            }}

            onMouseUp={() => {
                if(tracking){
                    setTracking(false)
                    setCurrentLine([])

                    // Save the drawing
                }
            }}
            onTouchEnd={() => {
                if(tracking){
                    setTracking(false)
                    setCurrentLine([])

                    // Save the drawing
                }
            }}
        ></canvas>
    )
}


class ImageControl{
    constructor(){
        this.lines = []
    }
    addLine(line){
        this.lines.push(line)
    }
    undo(){
        if(this.lines.length > 0){
            this.lines.pop()
            this.render()
        }
    }
    render(){
        canvas.clear()
        let tempThickness = crntThickness
        let tempColour = crntColour
        for (let i = 0; i < this.lines.length; i++) {
            let line = this.lines[i]
            crntColour = line.colour
            crntThickness = line.thickness
            canvas.drawLine(line.points)
        }
        crntColour = tempColour
        crntThickness = tempThickness
    }
    destroy(){
        this.lines = []
    }
    output(){
        return JSON.stringify({
            resolution: {
                width: canvas.canvas.width,
                height: canvas.canvas.height
            },
            lines:this.lines
        })
    }
}
