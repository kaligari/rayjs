import Ray from './ray.js'
import Point from './point.js'
import Color from './color.js'

export default class RendererEngine {
    constructor() {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
    }

    get getWidth() {
        return window.innerWidth
    }

    get getHeight() {
        return window.innerHeight
    }

    init() {
        this.width = 320 // this.getWidth
        this.height = 200 // this.getHeight
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
        const y0 = -1 /  aspectRatio
        const y1 = 1 /  aspectRatio
        const yStep = (y1 - y0) / (height - 1)
        const camera = scene.camera

        for(let j = 0; j < height; j++) {
            // const y = y0 + j * yStep
            const y = j
            for(let i = 0; i < width; i++) {
                // const x = x0 + i * xStep
                const x = i

                const rayDirection = new Point(x, y, 0)
                const ray = new Ray(camera, camera.subtract(rayDirection))

                const colors = this.rayTrace(ray, scene)

                // Generate a xor pattern with some random noise
                // const offset = Math.floor(0.5 / 10)
                // var red = ((x+offset) % 256) ^ ((y+offset) % 256);
                // var green = ((2*x+offset) % 256) ^ ((2*y+offset) % 256);
                // var blue = 50 + Math.floor(Math.random()*100);
                // // Rotate the colors
                // blue = (blue + offset) % 256;

                // Set the pixel data
                const pixelindex = (y * width + x) * 4;
                this.imagedata.data[pixelindex] = colors.red;     // Red
                this.imagedata.data[pixelindex+1] = colors.green; // Green
                this.imagedata.data[pixelindex+2] = colors.blue;  // Blue
                this.imagedata.data[pixelindex+3] = 255;   // Alpha
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
        const hitPosition = ray.origin + ray.direction * distanceHit
        color += this.colorAt(objectHit)
        return color
    }

    findNearest(ray, scene) {
        let distanceMin = null
        let objectHit = null
        for(const obj of scene.objects) {
            const dist = obj.intersects(ray)
            if(dist !== null) {
                distanceMin = dist
                objectHit = obj
            }
        }
        return [distanceMin, objectHit]
    }

    colorAt(objectHit) {
        return objectHit.material
    }
}
