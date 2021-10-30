import { DIRS } from "../Dirs"

class Sprite2{
    constructor(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite){
        this.name = name
        this.main = main
        this.spriteSheet = spriteSheet
        this.spriteData = spriteData

        this.posX = initPositions.posX
        this.posY = initPositions.posY
        this.velX = initVelocities.velX
        this.velY = initVelocities.velY

        this.idleSprite = idleSprite
        this.dir = initDir

        this.frameCounter = frameCounter

        this.spriteDebug = true
    }

    drawSprite(){
        this.main.context.drawImage(
            this.spriteSheet,
            this.spriteData[DIRS[this.dir]][this.frameCounter].sx,
            this.spriteData[DIRS[this.dir]][this.frameCounter].sy,
            this.spriteData.actualWidth,
            this.spriteData.actualHeight,

            this.posX,
            this.posY,
            this.spriteData.screenWidth,
            this.spriteData.screenHeight
        )

        if(this.spriteDebug){
            this.main.context.strokeStyle = "red"
            this.main.context.strokeRect(this.posX, this.posY, this.spriteData.screenWidth, this.spriteData.screenHeight)
        }
    }

    update(){
        if(!this.idleSprite){
            this.updateSpritePos()
        }
        if(this.frameCounter === this.spriteData[DIRS[this.dir]].length - 1){
            this.frameCounter = 0
            return
        }
        this.frameCounter += 1
    }

    updateSpritePos(){
        switch(this.dir){
            case "UP":
                this.posY -= this.velY
                break;
            case "DOWN":
                this.posY += this.velY
                break;
            case "LEFT":
                this.posX -= this.velX
                break;
            case "RIGHT":
                this.posX += this.velX
                break;
            default:
                console.log("Direction is not valid")
                break;
        }
    }

    changeIdleState(){
        this.idleSprite = !this.idleSprite
    }

    changeSpriteDirection(newDir){
        this.dir = newDir
    }
}

export default Sprite2