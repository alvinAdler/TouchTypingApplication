import Sprite2 from "./Sprite2";
import FireBall2 from './Fireball2'

class Dragon2 extends Sprite2{
    constructor(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite,
        fballSpriteSheet, fballData){

        super(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite)

        this.fballSpriteSheet = fballSpriteSheet
        this.fballData = fballData
    }

    shootFireBall(animationArray){
        let fireBallPos = {x: 0, y: 0}

        switch(this.dir){
            case "UP":
                fireBallPos.x = (this.posX + (this.spriteData.scaledWidth / 2)) - (this.fballData.scaledWidth / 2)
                fireBallPos.y = this.posY - this.fballData.scaledHeight
                break;
            case "DOWN":
                fireBallPos.x = (this.posX + (this.spriteData.scaledWidth / 2)) - (this.fballData.scaledWidth / 2)
                fireBallPos.y = this.posY + this.spriteData.scaledHeight
                break;
            case "LEFT": 
                fireBallPos.x = this.posX - this.fballData.scaledWidth
                fireBallPos.y = this.posY + ((this.spriteData.scaledHeight / 2) - (this.fballData.scaledHeight / 2))
                break;
            case "RIGHT":
                fireBallPos.x = this.posX + this.spriteData.scaledWidth
                fireBallPos.y = this.posY + ((this.spriteData.scaledHeight / 2) - (this.fballData.scaledHeight / 2))
                break;
            default:
                console.log("Current dir is not valid")
        }

        const fireball = new FireBall2(
            "FireBall",
            this.main, 
            this.fballSpriteSheet, this.fballData,
            {
                posX: fireBallPos.x,
                posY: fireBallPos.y
            },
            {
                velX: this.velX * 2,
                velY: this.velY * 2
            },
            this.dir,
            0,
            false
        )

        animationArray.push(fireball)
    }
}

export default Dragon2