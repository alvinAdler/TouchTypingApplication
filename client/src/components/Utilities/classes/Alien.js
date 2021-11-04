import Sprite2 from "./Sprite2"
import { randomInteger } from "../functions"

class Alien extends Sprite2{
    constructor(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite, listOfWords){
        super(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite)
        this.listOfWords = listOfWords
        this.selectedWord = listOfWords[randomInteger(0, listOfWords.length - 1)]
    }

    drawSprite(){
        super.drawSprite()
        
        //* As the sprite is being drawn, we also want to embed some words to the sprite.
        this.main.context.font = "normal 20px Arial"
        this.main.context.fillStyle = "white"
        this.main.context.textAlign = "center"
        this.main.context.textBaseline = "alphabetic"

        this.main.context.fillText(this.selectedWord, (this.posX + this.spriteData.screenWidth) - (this.spriteData.screenWidth / 2), this.posY - 10)
    }   
}

export default Alien