import Sprite2 from "./Sprite2"

class Alien extends Sprite2{
    constructor(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite, selectedWord){
        super(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite)
        this.selectedWord = selectedWord
    }

    drawSprite(){
        super.drawSprite()
        
        //* As the sprite is being drawn, we also want to embed some words to the sprite.
        //* However, if the sprite already hits the ground, then don't draw the selected word
        if(this.dir !== "HITSGROUND"){
            this.drawSelectedWord()
        }
    }

    drawSelectedWord(){
        this.main.context.font = "normal 20px Arial"
        this.main.context.fillStyle = "white"
        this.main.context.textAlign = "center"
        this.main.context.textBaseline = "alphabetic"

        this.main.context.fillText(this.selectedWord, (this.posX + this.spriteData.screenWidth) - (this.spriteData.screenWidth / 2), this.posY - 10)
    }
    
    selfDestroy(){
        console.log("This alien will be destroyed")
    }
}

export default Alien