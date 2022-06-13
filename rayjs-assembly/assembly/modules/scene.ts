import Light from "./light"
import Point from "./point"
import Sphere from "./sphere"

export default class Scene {
    camera: Point
    objects: Sphere[]
    lights: Light[]

    constructor(camera: Point, objects: Sphere[], lights: Light[]) {
        this.camera = camera
        this.objects = objects
        this.lights = lights
    }
}
