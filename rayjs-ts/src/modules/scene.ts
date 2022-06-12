import Light from "./light"
import Sphere from "./sphere"
import Vector from "./vector"

export default class Scene {
    camera: Vector
    objects: Sphere[]
    lights: Light[]
    width: number
    height: number

    constructor(camera: Vector, objects: Sphere[], lights: Light[], width: number, height: number) {
        this.camera = camera
        this.objects = objects
        this.lights = lights
        this.width = width
        this.height = height
    }
}
