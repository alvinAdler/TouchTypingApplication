import Sprite2 from "./Sprite2";
import CannonBall from './CannonBall.js'

const CANNONBALL_VELOCITY = {
    x: 20,
    y: 20
}


class Tank extends Sprite2{
    constructor(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite,
    cannonBallSpriteSheet, cannonBallData){
        super(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite)

        this.cannonBallSpriteSheet = cannonBallSpriteSheet
        this.cannonBallData = cannonBallData
    }

    shootProjectile(arrSprites){
        arrSprites.unshift(new CannonBall(
            "Cannon Ball",
            {
                main: this.main,
                context: this.main.context
            },
            this.cannonBallSpriteSheet, this.cannonBallData,
            {
                posX: ((this.posX) + (this.spriteData.screenWidth / 2)) - (this.cannonBallData.screenWidth / 2),
                posY: this.posY - this.cannonBallData.screenHeight - 5
            },
            {
                velX: CANNONBALL_VELOCITY.x,
                velY: CANNONBALL_VELOCITY.y
            },
            "UP",
            0,
            false
        ))
    }
}

export default Tank