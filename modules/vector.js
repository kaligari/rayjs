export default class Vector {
    constructor(x, y, angle, length, power) {
        this.x = x
        this.y = y
        this.angle = angle
        this.length = length
        this.power = power
        this.collision = null
        this.collisionDistance = null
    }
}
