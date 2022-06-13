import Light from "./light"
import Sphere from "./sphere"
import Vector from "./vector"

export default class Scene {
    camera: Vector
    objects: Sphere[]
    lights: Light[]

    constructor(camera: Vector, objects: Sphere[], lights: Light[]) {
        this.camera = camera
        this.objects = objects
        this.lights = lights
    }
}
