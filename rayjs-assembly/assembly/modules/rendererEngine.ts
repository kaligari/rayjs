import Color from './color'
import Material from './material'
import Point from './point'
import Ray from './ray'
import Scene from './scene'
import Sphere from './sphere'
import Vector from './vector'

class NearestObject {
    distanceHit: i32
    objectHit: Sphere

    constructor(distanceHit: i32, objectHit: Sphere) {
        this.distanceHit = distanceHit
        this.objectHit = objectHit
    }
}
export default class RendererEngine {
    width: u16
    height: u16
    imageBuffer: Uint32Array

    constructor(width: u16, height: u16) {
        this.width = width
        this.height = height
        this.imageBuffer = new Uint32Array(this.width * this.height)
    }

    render(scene: Scene): void {
        // TODO ? width, height from scene?
        const width: u16 = this.width
        const height: u16 = this.height
        const aspectRatio: u16 = width / height
        const x0: i16 = -1
        const x1: i16 = 1
        const xStep: i16 = (x1 - x0) / (width - 1)
        const y0: i16 = -1 / aspectRatio
        const y1: i16 = 1 / aspectRatio
        const yStep: i16 = (y1 - y0) / (height - 1)
        const camera = scene.camera
        
        for(let j: u16 = 0; j < height; j++) {
            const y: u16 = y0 + j * yStep
            for(let i: u16 = 0; i < width; i++) {
                const x: u16 = x0 + i * xStep
                const ray = new Ray(camera, new Point(x, y, 0).subtract(camera))
                const color: Color = this.rayTrace(ray, scene)
                // Set the pixel data
                const pixelindex: u16 = (j * width + i)
                this.imageBuffer[pixelindex] = color.red |
                (color.green << 8) |  
                (color.blue << 16) |
                (255 << 24);
            }
        }
    }

    rayTrace(ray: Ray, scene: Scene): Color {
        let color: Color = new Color(0, 0, 0)
        const nearestObject: NearestObject = this.findNearest(ray, scene)
        const distanceHit: i32 = nearestObject.distanceHit
        const objectHit: Sphere = nearestObject.objectHit
        if(objectHit === null) {
            return color
        }
        const hitPosition = ray.origin.add(ray.direction.multiply(distanceHit))
        const hitNormal = objectHit.normal(hitPosition)
        color.add(this.colorAt(objectHit, hitPosition, hitNormal, scene))
        return color
    }

    findNearest(ray: Ray, scene: Scene): NearestObject {
        let distanceHit: i32 = -1
        let objectHit = new Sphere(new Point(0, 0, 0), 0.5,
            new Material(
                new Color(255, 0, 0)
            )
        )
        for(let i: i32 = 0; i < scene.objects.length; i++) {
            const obj = scene.objects[i]
            const dist = obj.intersects(ray)
            if(dist !== -1 && dist < distanceHit) {
                distanceHit = dist
                objectHit = obj
            }
        }
        return new NearestObject(distanceHit, objectHit)
    }

    colorAt(objectHit: Sphere, hitPosition: Point, hitNormal: Vector, scene: Scene): Color {
        const material = objectHit.material
        // const objectColor = material.colorAt(hitPosition)
        const objectColor = material.colorAt()
        const toCam = scene.camera.subtract(hitPosition)
        const specularK = 100
        let color = new Color(0, 0, 0).multiply((material.ambient) as u32)
        for(let i: i32 = 0; i < scene.lights.length; i++) {
            const light = scene.lights[i]
            const toLight = new Ray(hitPosition, light.position.subtract(hitPosition))
            // diffuse shading
            color.add(objectColor.multiply((material.diffuse * Math.max(hitNormal.dotProduct(toLight.direction), 0)) as u32))
            // specular shading
            const halfVector = toLight.direction.add(toCam).normalize
            color.add(light.color.multiply((material.specular) as u32).multiply((Math.max(hitNormal.dotProduct(halfVector), 0) ** specularK) as u32))
        }
        return color
    }
}
