import React, {useState, useRef, useEffect, useContext} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

import './GameModePage_master.css'

import Tank from '../../Utilities/classes/Tank'
import Alien from '../../Utilities/classes/Alien'
import AuthContext from '../../context/AuthContext'

import {tankData, alienData, cannonBallData} from '../../Utilities/SpriteSheetData'
import { DIRS } from '../../Utilities/Dirs'
import { randomInteger } from '../../Utilities/functions'

const FRAME_TRANS_LIMIT = 5
const FRAME_PER_SECOND = 60

const DEVELOPER_MODE = true

const GameModePage = () => {

    const SPAWN_ALIEN_PER = useRef(0)
    const ALIEN_VELOCITY = useRef(0)

    const [mainSheets, setMainSheets] = useState({})
    const [listOfWords, setListOfWords] = useState([])
    const [userHealth, setUserHealth] = useState(3)
    
    const userInput = useRef()
    const mainCanvas = useRef(null)
    const sheetsContainer = useRef([])
    const arrSprites = useRef([])
    const stopId = useRef(0)
    const frameCounter = useRef(0)
    const timeCounter = useRef(0)
    const possibleCollision = useRef([])
    const landedAliens = useRef([])
    const alienHitCount = useRef(30)
    const userHealthCopy = useRef(3)

    const location = useLocation()
    const authorize = useContext(AuthContext)

    useEffect(() => {
        const onPageLoad = () => {


            mainCanvas.current.width = mainCanvas.current.offsetWidth
            mainCanvas.current.height = mainCanvas.current.offsetHeight

            addNewSpriteSheet("alienSpriteSheet", "/images/spriteSheets/greenAlien.png")
            addNewSpriteSheet("cannonBallSpriteSheet", "/images/spriteSheets/cannonBall.png")
            addNewSpriteSheet("tankSpriteSheet", "/images/spriteSheets/tank.png")

            Promise.all(sheetsContainer.current)
            .then((resolves) => {
                const temp = {}
                resolves.forEach((item) => {
                    temp[item.sheetName] = item.image
                })
                setMainSheets(temp)
            })

            axios({
                method: "GET",
                url: `http://localhost:5000/api/words/gameMode/${location.state.diff}`
            })
            .then((res) => {
                setListOfWords(res.data.words)
                SPAWN_ALIEN_PER.current = res.data.alienDropRate
                ALIEN_VELOCITY.current = res.data.alienSpeed
            })
            .catch((err) => {
                console.error(err)
            })
        }

        onPageLoad()
    }, [])

    useEffect(() => {
        if(Object.keys(mainSheets).length === 3){
            initSprites()
        }
    }, [mainSheets])

    const addNewSpriteSheet = (sheetName, sheetLocation) => {
        const promise = new Promise((resolve) => {
            const image = new Image()
            image.src = sheetLocation

            image.onload = () => {
                resolve({sheetName, image})
            }
        })

        sheetsContainer.current.push(promise)
    }

    const defaultVariables = () => {
        arrSprites.current = []
        stopId.current = 0
        frameCounter.current = 0
        timeCounter.current = 0
        possibleCollision.current = []
        landedAliens.current = []
        alienHitCount.current = 30
    }

    const initSprites = () => {
        clearCanvas()

        arrSprites.current.unshift(new Tank(
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
                //* Tank does not move. 
                velX: 0, 
                velY: 0
            },
            "UP",
            0,
            true,
            mainSheets["cannonBallSpriteSheet"],
            cannonBallData
        ))

        drawAlienHitCount()

        arrSprites.current.forEach((sprite) => {
            sprite.drawSprite()
        })
    }

    const startAnimation = () => {        
        clearCanvas()

        drawAlienHitCount()

        console.log("Animation on")

        //Checking the end game (whether the player lose or win)
        let isGameEnd = (userHealthCopy.current === 0) || (alienHitCount.current === 0)

        if(isGameEnd){
            stopAnimation()
            defaultVariables()

            Swal.fire({
                icon: "success",
                title: "Game Over!",
                text: "You completed the game"
            })
            .then(() => {
                initSprites()
            })

            return
        }

        if(timeCounter.current >= FRAME_PER_SECOND * SPAWN_ALIEN_PER.current){
            generateRandomAlien()
            timeCounter.current = 0
        }

        //* Check for sprites that has the word that the user type
        let matchingSprites = checkKeywordExistence()
        if(matchingSprites.length > 0){

            let sprite = matchingSprites[matchingSprites.length - 1]
            let tank = arrSprites.current[arrSprites.current.length - 1]

            tank.posX = sprite.posX - (tank.spriteData.screenWidth / 2) + (sprite.spriteData.screenWidth / 2)
            shootCannon()

            possibleCollision.current.push({
                alien: sprite,
                cannonBall: arrSprites.current[0]
            })

            clearInput()
        }

        arrSprites.current.forEach((sprite) => {
            updateSprite(sprite)

            possibleCollision.current.forEach((item) => {
                if(isColliding(item.alien, item.cannonBall)){
                    //* If the cannonball collides with the alien, remove the cannonball from --
                    //* -- the array of sprites and remove the current item from the array of items that might collide.

                    let currentAlien = arrSprites.current[arrSprites.current.indexOf(item.alien)]
                    removeElementFromArray(arrSprites.current, item.cannonBall)
                    removeElementFromArray(possibleCollision.current, item)

                    //*Change the animation of the alien to become the "destroyed" animation. 
                    currentAlien.idleSprite = true
                    currentAlien.dir = "DESTROY"
                    currentAlien.spriteFrameCounter = 0

                    alienHitCount.current -= 1
                }
            })

            //* If an alien already reached the land, then stop the alien and adjust the posY of the alien to match the land
            if(sprite.name === "Alien" && sprite.dir !== "HITSGROUND" && (sprite.posY + sprite.spriteData.screenHeight >= mainCanvas.current.height)){
                sprite.posY = mainCanvas.current.height - sprite.spriteData.screenHeight
                sprite.idleSprite = true
                arrSprites.current[arrSprites.current.indexOf(sprite)].dir = "HITSGROUND"

                //* Push the current item to a specific array.
                landedAliens.current.push(sprite)
                setUserHealth(prevState => prevState - 1)
                userHealthCopy.current -= 1
            }
            //Just in case if the cannonball goes offscreen
            else if(sprite.name === "Cannon Ball" && (sprite.posY <= 0)){
                removeElementFromArray(arrSprites.current, sprite)
            }
        })

        arrSprites.current.forEach((sprite) => {
            sprite.drawSprite()
        })

        //* Update frame once every *FRAME_TRANS_LIMIT*. This will take effect in the updateSprite function.
        if(frameCounter.current < FRAME_TRANS_LIMIT){
            frameCounter.current += 1
        }
        else{
            frameCounter.current = 0
        }
        timeCounter.current += 1

        stopId.current = window.requestAnimationFrame(startAnimation)
    }

    const stopAnimation = () => {
        window.cancelAnimationFrame(stopId.current)
        console.log("Animation off")
    }

    const updateSprite = (sprite) => {
        if(!sprite.idleSprite){
            sprite.updateSpritePos()
        }
        if(frameCounter.current === FRAME_TRANS_LIMIT){
            if(sprite.spriteFrameCounter === sprite.spriteData[DIRS[sprite.dir]].length - 1){
                if(sprite.dir === "DESTROY"){
                    removeElementFromArray(arrSprites.current, sprite)
                }else{
                    sprite.spriteFrameCounter = 0
                }
                return
            }
            sprite.spriteFrameCounter += 1
        }
    }

    const generateRandomAlien = () => {
        arrSprites.current.unshift(new Alien(
            "Alien",
            {
                main: mainCanvas.current,
                context: mainCanvas.current.getContext("2d")
            },
            mainSheets["alienSpriteSheet"], alienData,
            {
                posX: randomInteger(0, mainCanvas.current.width - alienData.screenWidth),
                posY: -90
            },
            {
                velX: ALIEN_VELOCITY.current,
                velY: ALIEN_VELOCITY.current
            },
            "DOWN",
            0,
            false,
            listOfWords[randomInteger(0, listOfWords.length - 1)]
        ))
    }

    const checkKeywordExistence = () => {
        return arrSprites.current.filter((sprite) => ((sprite.selectedWord === userInput.current.value) && sprite.dir !== "HITSGROUND"))
    }

    const isColliding = (sprite1, sprite2) => {
        if((sprite1.posX <= (sprite2.posX + sprite2.spriteData.screenWidth)) && 
        ((sprite1.posX + sprite1.spriteData.screenWidth) >= sprite2.posX) &&
        (sprite1.posY <= (sprite2.posY + sprite2.spriteData.screenHeight)) &&
        ((sprite1.posY + sprite1.spriteData.screenHeight) >= sprite2.posY))
        {
            return true
        }
        return false
    }

    const drawAlienHitCount = () => {
        let canvasContext = mainCanvas.current.getContext("2d")

        canvasContext.font = "normal 250px monospace"
        canvasContext.fillStyle = "rgba(255, 255, 255, 0.2)"
        canvasContext.textAlign = "center"
        canvasContext.textBaseLine = "center"

        canvasContext.fillText(alienHitCount.current.toString(), mainCanvas.current.width / 2, mainCanvas.current.height / 2)
    }

    const removeElementFromArray = (arr, element) => {
        let index = arr.indexOf(element)
        if(index > -1){
            arr.splice(index, 1)
        }
    }

    const printArrSprites = () => {
        console.log(arrSprites.current)
    }

    const clearCanvas = () => {
        mainCanvas.current.getContext("2d").clearRect(0, 0, mainCanvas.current.width, mainCanvas.current.height)
    }

    const shootCannon = () => {
        //* Grab the tank. The tank will always become the last element.
        arrSprites.current[arrSprites.current.length - 1].shootProjectile(arrSprites.current)
    }

    const clearInput = () => {
        userInput.current.value = ""
    }

    return (
        <div className="game-mode-container">
            <div className="user-lifes-container">
                {Array.from(Array(userHealth)).map((item, index) => {
                    console.log(userHealth)
                    return(
                        <img key={index} src="/images/userLifes.png" alt="Picture have not been found" />
                    )
                })}
            </div>
            <canvas className="gameplay-canvas" ref={mainCanvas} style={{backgroundImage: "url(/images/canvasBackground.png)"}}></canvas>
            <input 
                className = "gameplay-input" 
                type = "text" 
                placeholder = "Inputs from User"
                ref = {userInput}
            />
            {DEVELOPER_MODE && 
                <div className="debugging-buttons">
                    <button className="btn btn-primary" onClick={initSprites}>Init Sprites</button>
                    <button className="btn btn-success" onClick={() => window.requestAnimationFrame(startAnimation)}>Start Animation</button>
                    <button className="btn btn-danger" onClick={stopAnimation}>Stop Animation</button>
                    <button className="btn btn-danger" onClick={() => {
                        clearCanvas()
                        sheetsContainer.current = []
                        stopId.current = 0
                        frameCounter.current = 0
                        arrSprites.current = []
                        timeCounter.current = 0
                    }}>
                        Clear Canvas
                    </button>
                    <button className="btn btn-primary" onClick={printArrSprites}>Check Sprites Array</button>
                    <button className="btn btn-danger" onClick={() => console.log(userHealth)}>Check user health</button>
                </div>
            }
        </div>
    )
}

export default GameModePage
