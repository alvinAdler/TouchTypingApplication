import Sprite2 from "./Sprite2";
import CannonBall from './CannonBall.js'

class Tank extends Sprite2{
    constructor(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite,
    cannonBallSpriteSheet, cannonBallData){
        super(name, main, spriteSheet, spriteData, initPositions, initVelocities, initDir, frameCounter, idleSprite)

        this.cannonBallSpriteSheet = cannonBallSpriteSheet
        this.cannonBallData = cannonBallData

    }
}

export default Tank