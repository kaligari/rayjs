import Ray from './ray'
import Point from './point'
import Color from './color'
import Scene from './scene'
import Sphere from './sphere'
import Vector from './vector'
import Material from './material'

class NearestObject {
    distanceHit: i64
    objectHit: Sphere
    constructor(distanceHit: i64, objectHit: Sphere) {
        this.distanceHit = distanceHit
        this.objectHit = objectHit
    }
}

export default class RendererEngine {
    width: u32
    height: u32
    // deltaNow: u64
    // deltaThen: u64
    // delta: u64
    // fps: u8
    imageBuffer: Uint32Array

    constructor(width: number, height: number) {
        this.width = width as u32
        this.height = height as u32
        // this.deltaNow = 0
        // this.deltaThen = 0
        // this.delta = 0
        // this.fps = 0
        this.imageBuffer = new Uint32Array(this.width * this.height)
    }

    render(scene: Scene): void {
        const width: u32 = scene.width as u32
        const height: u32 = scene.height as u32
        const aspectRatio = width / height
        const x0 = -1
        const x1 = 1
        const xStep = (x1 - x0) / (width - 1)
        const y0 = -1 / aspectRatio
        const y1 = 1 / aspectRatio
        const yStep = (y1 - y0) / (height - 1)
        const camera = scene.camera

        // this.setDelta()
        
        for(let j: u16 = 0; j < height; j++) {
            const y: u32 = y0 + j * yStep
            for(let i: u16 = 0; i < width; i++) {
                const x = x0 + i * xStep
                const ray = new Ray(camera, new Point(x, y, 0).subtract(camera))
                const color = this.rayTrace(ray, scene)
                // Set the pixel data
                const offset: u32 = j * width
                const pixelindex: u32 = offset + i
                this.imageBuffer[pixelindex] = color.red |
                (color.green << 8) |  
                (color.blue << 16) |
                (255 << 24);
            }
        }
    }

    rayTrace(ray: Ray, scene: Scene): Color {
        let color = new Color(0, 0, 0)
        const nearestObject = this.findNearest(ray, scene)
        const objectHit = nearestObject.objectHit
        const distanceHit = nearestObject.distanceHit
        if(objectHit === null) {
            return color
        }
        const hitPosition = ray.origin.add(ray.direction.multiply(distanceHit as number))
        const hitNormal = (objectHit as Sphere).normal(hitPosition)
        color.add(this.colorAt(objectHit as Sphere, hitPosition, hitNormal, scene))
        return color
    }

    findNearest(ray: Ray, scene: Scene): NearestObject {
        let distanceHit: i64 = 0
        let objectHit: Sphere = new Sphere(new Vector(0, 0, 0), 0, new Material(new Color(0, 0 ,0)))
        for(let i: i32 = 0; i < scene.objects.length; i++) {
            const obj = scene.objects[i]
            const dist = obj.intersects(ray)
            if(dist !== -1 && dist < distanceHit) {
                distanceHit = dist
                objectHit = obj
            }
        }
        // const toReturn = new Map<string, i64 | Sphere>()
        // toReturn.set('distanceHit', distanceHit)
        // toReturn.set('objectHit', objectHit)
        // return toReturn
        // // { distanceHit, objectHit }

        const toReturn = new NearestObject(distanceHit, objectHit)
        return toReturn
    }

    colorAt(objectHit: Sphere, hitPosition: Vector, hitNormal: Vector, scene: Scene): Color {
        const material = objectHit.material
        // const objectColor = material.colorAt(hitPosition)
        const objectColor = material.colorAt()
        const toCam = scene.camera.subtract(hitPosition)
        const specularK = 100
        let color = new Color(0, 0, 0).multiply(material.ambient as u8)
        // for(const light of scene.lights) {
        for(let i: i32 = 0; i < scene.lights.length; i++) {
            const light = scene.lights[i]
            const toLight = new Ray(hitPosition, light.position.subtract(hitPosition))
            // diffuse shading
            color.add(objectColor.multiply((material.diffuse * Math.max(hitNormal.dotProduct(toLight.direction), 0)) as u8))
            // specular shading
            const halfVector = toLight.direction.add(toCam).normalize
            color.add(light.color.multiply((material.specular as u8)).multiply((Math.max(hitNormal.dotProduct(halfVector), 0) ** specularK) as u8))
        }
        return color
    }

    // setDelta(): void {
    //     this.deltaNow = Date.now()
    //     this.delta = (this.deltaNow - this.deltaThen) / 1000
    //     this.deltaThen = this.deltaNow
    //     this.fps = Math.floor(1 / this.delta)
    // }
}
