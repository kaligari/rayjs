import Vector from './vector'

export default class Animations {
    object: Vector
    initX: number
    value: number
    step: number
    radius: number

    constructor(object: Vector, initVal: number, radius: number, step: number) {
        this.object = object
        this.initX = object.x
        this.value = initVal
        this.step = step
        this.radius = radius
    }

    // animate(delta: number): void {
    animate(): void {
        if(this.value > 360) {
            this.value = 0
        }
        this.value += this.step
        this.object.x = this.radius * Math.cos(this.value)
        this.object.y = this.radius * Math.sin(this.value)
    }
}