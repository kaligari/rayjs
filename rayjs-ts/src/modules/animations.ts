import Point from "./point";
export default class Animations {
    object: Point
    initX: number
    value: number
    step: number
    radius: number

    constructor(object: Point, initVal: number, radius: number, step: number) {
        this.object = object
        this.initX = object.x
        this.value = initVal
        this.step = step
        this.radius = radius
    }

    animate(delta: number) {
        if(this.value > 360) {
            this.value = 0
        }
        this.value += this.step * delta
        this.object.x = this.radius * Math.cos(this.value)
        this.object.y = this.radius * Math.sin(this.value)
    }
}