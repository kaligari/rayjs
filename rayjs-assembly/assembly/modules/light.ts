import Color from "./color"
import Vector from "./vector"

export default class Light {
    position: Vector
    color: Color

    constructor(position: Vector, color: Color = new Color(255, 255, 255)) {
        this.position = position
        this.color = color
    }
}
