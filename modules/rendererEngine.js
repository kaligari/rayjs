import Ray from './ray.js'
import Point from './point.js'
import Color from './color.js'

export default class RendererEngine {
    constructor() {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
    }

    init(width, height) {
        this.width = width
        this.height = height
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.fillStyle = '#000000'
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.imagedata = this.ctx.createImageData(this.width, this.height)
    }

    render(scene) {
        const width = scene.width
        const height = scene.height
        const aspectRatio = width / height
        const x0 = -1
        const x1 = 1
        const xStep = (x1 - x0) / (width - 1)
        const y0 = -1 / aspectRatio
        const y1 = 1 / aspectRatio
        const yStep = (y1 - y0) / (height - 1)
        const camera = scene.camera

        for(let j = 0; j < height; j++) {
            const y = y0 + j * yStep
            for(let i = 0; i < width; i++) {
                const x = x0 + i * xStep
                const ray = new Ray(camera, new Point(x, y, 0).subtract(camera))
                const color = this.rayTrace(ray, scene)
                // Set the pixel data
                const pixelindex = (j * width + i) * 4
                this.imagedata.data[pixelindex] = color.red
                this.imagedata.data[pixelindex + 1] = color.green
                this.imagedata.data[pixelindex + 2] = color.blue
                this.imagedata.data[pixelindex + 3] = 255
            }
        }
        this.ctx.putImageData(this.imagedata, 0, 0)
    }

    rayTrace(ray, scene) {
        let color = new Color(0, 0, 0)
        const [distanceHit, objectHit] = this.findNearest(ray, scene)
        if(objectHit === null) {
            return color
        }
        const hitPosition = ray.origin.add(ray.direction.multiply(distanceHit))
        const hitNormal = objectHit.normal(hitPosition)
        //color = this.colorAt(objectHit, hitPosition, hitNormal, scene)
        color.add(this.colorAt(objectHit, hitPosition, hitNormal, scene))
        return color
    }

    findNearest(ray, scene) {
        let distanceMin = null
        let objectHit = null
        for(const obj of scene.objects) {
            const dist = obj.intersects(ray)
            if(dist !== null && (objectHit === null || dist < distanceMin)) {
                distanceMin = dist
                objectHit = obj
            }
        }
        return [distanceMin, objectHit]
    }

    colorAt(objectHit, hitPosition, hitNormal, scene) {
        const material = objectHit.material
        const objectColor = material.colorAt(hitPosition)
        const toCam = scene.camera.subtract(hitPosition)
        const specularK = 50
        let color = new Color(0, 0, 0).multiply(material.ambient)
        for(const light of scene.lights) {
            const toLight = new Ray(hitPosition, light.position.subtract(hitPosition))
            // diffuse shading
            color.add(objectColor.multiply(material.diffuse * Math.max(hitNormal.dotProduct(toLight.direction), 0)))
            // specular shading
            // const halfVector = toLight.direction.add(toCam).normalize
            // color.add(light.color.multiply(material.specular * Math.max(hitNormal.dotProduct(halfVector), 0)))
        }
        return color
    }
}
