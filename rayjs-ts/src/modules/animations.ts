import Sphere from "./sphere";

export default class Animations {
    object: Sphere
    initX: number
    value: number
    step: number
    radius: number

    constructor(object: Sphere, initVal: number, radius: number, step: number) {
        this.object = object
        this.initX = object.center.x
        this.value = initVal
        this.step = step
        this.radius = radius
    }

    animate() {
        if(this.value > 360) {
            this.value = 0
        }
        this.value += this.step
        this.object.center.x = this.radius * Math.cos(this.value)
        this.object.center.z = this.radius * Math.sin(this.value)
    }
}