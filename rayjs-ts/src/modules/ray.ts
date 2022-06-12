import Point from "./point"
import Vector from "./vector"

export default class Ray {
    origin: Point
    direction: Vector
    
    constructor(origin: Point, direction: Vector) {
        this.origin = origin
        this.direction = direction.normalize
    }
}
