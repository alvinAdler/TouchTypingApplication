import React, {useState, useRef, useEffect} from 'react'

import './GameModePage_master.css'

import Tank from '../../Utilities/classes/Tank'
import Alien from '../../Utilities/classes/Alien'

import {tankData, alienData, cannonBallData} from '../../Utilities/SpriteSheetData'

const FRAME_LIMIT = 10

const GameModePage = () => {

    const [mainSheets, setMainSheets] = useState({})

    const mainCanvas = useRef(null)

    let sheetsContainer = []
    let arrSprites = []
    let stopId = 0
    let frameLoopCount = 0

    useEffect(() => {
        const onPageLoad = () => {
            mainCanvas.current.width = mainCanvas.current.offsetWidth
            mainCanvas.current.height = mainCanvas.current.offsetHeight

            addNewSpriteSheet("alienSpriteSheet", "/images/spriteSheets/greenAlien.png")
            addNewSpriteSheet("cannonBallSpriteSheet", "/images/spriteSheets/cannonBall.png")
            addNewSpriteSheet("tankSpriteSheet", "/images/spriteSheets/tank.png")

            Promise.all(sheetsContainer)
            .then((resolves) => {
                const temp = {}
                resolves.forEach((item) => {
                    temp[item.sheetName] = item.image
                })
                setMainSheets(temp)
            })
        }

        onPageLoad()
    }, [])

    const addNewSpriteSheet = (sheetName, sheetLocation) => {
        const promise = new Promise((resolve) => {
            const image = new Image()
            image.src = sheetLocation

            image.onload = () => {
                resolve({sheetName, image})
            }
        })

        sheetsContainer.push(promise)
    }

    const initSprites = () => {
        arrSprites.unshift(new Tank(
            "Tank",
            {
                main: mainCanvas.current,
                context: mainCanvas.current.getContext("2d")
            },
            mainSheets["tankSpriteSheet"], tankData,
            {
                posX: (mainCanvas.current.width / 2) - (tankData.screenWidth / 2),
                posY: mainCanvas.current.height - tankData.screenHeight
            },
            {
                velX: 10, 
                velY: 10
            },
            "UP",
            0,
            true,
            mainSheets["cannonBallSpriteSheet"],
            cannonBallData
        ))

        arrSprites.unshift(new Alien(
            "Alien",
            {
                main: mainCanvas.current,
                context: mainCanvas.current.getContext("2d")
            },
            mainSheets["alienSpriteSheet"], alienData,
            {
                posX: 0,
                posY: -90
            },
            {
                velX: 8,
                velY: 8
            },
            "DOWN",
            0,
            false
        ))

        arrSprites.forEach((sprite) => {
            sprite.drawSprite()
        })
    }

    const startAnimation = () => {
        if(frameLoopCount < FRAME_LIMIT){
            frameLoopCount += 1
            stopId = window.requestAnimationFrame(startAnimation)
            return
        }
        clearCanvas()

        console.log("Animation on")

        frameLoopCount = 0
        arrSprites.forEach((sprite) => {
            sprite.update()

            //Roughly check if a sprite hits the border of the screen
            // if(sprite.posX > mainCanvas.current.width || sprite.posX < 0 || sprite.posY > mainCanvas.current.height || sprite.posY < 0){
            //     arrSprites.splice(arrSprites.indexOf(sprite), 1)
            // }

            //If the bottom part of a sprite exceed the screen, stop the sprite
            if(sprite.name === "Alien" && (sprite.posY + sprite.spriteData.screenHeight >= mainCanvas.current.height)){
                sprite.posY = mainCanvas.current.height - sprite.spriteData.screenHeight
                sprite.idleSprite = true
            }
        })

        arrSprites.forEach((sprite) => {
            sprite.drawSprite()
        })

        stopId = window.requestAnimationFrame(startAnimation)
    }

    const stopAnimation = () => {
        window.cancelAnimationFrame(stopId)
        console.log("Animation off")
    }

    const removeElementFromArray = (arr, element) => {
        let index = arr.indexOf(element)
        if(index > -1){
            arr.splice(index, 1)
        }
    }

    const printArrSprites = () => {
        console.log(arrSprites)
    }

    const clearCanvas = () => {
        mainCanvas.current.getContext("2d").clearRect(0, 0, mainCanvas.current.width, mainCanvas.current.height)
    }

    return (
        <div className="game-mode-container">
            <canvas className="gameplay-canvas" ref={mainCanvas} style={{backgroundImage: "url(/images/canvasBackground.png)"}}></canvas>
            <input className="gameplay-input" type="text" placeholder="Inputs from User" />
            <div className="debugging-buttons">
                <button className="btn btn-primary" onClick={initSprites}>Init Sprites</button>
                <button className="btn btn-success" onClick={startAnimation}>Start Animation</button>
                <button className="btn btn-danger" onClick={stopAnimation}>Stop Animation</button>
                <button className="btn btn-danger" onClick={() => {
                    clearCanvas()
                    sheetsContainer = []
                    arrSprites = []
                    stopId = 0
                    frameLoopCount = 0
                }}>
                    Clear Canvas
                </button>
                <button className="btn btn-primary" onClick={printArrSprites}>Check Sprites Array</button>
            </div>
        </div>
    )
}

export default GameModePage
