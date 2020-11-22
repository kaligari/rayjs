import Ray from './ray.js'
import Point from './point.js'

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
                // console.log(i, j);
                // const x = x0 + i * xStep
                const x = i
                const offset = Math.floor(0.5 / 10)
                // console.log(camera);
                // const rayDirection = new Point(x, y, 0)
                // console.log(rayDirection);
                // const ray = new Ray(camera, new Point(x, y, 0) camera.subtract(rayDirection))
                // Get the pixel index

                // Generate a xor pattern with some random noise
                var red = ((x+offset) % 256) ^ ((y+offset) % 256);
                var green = ((2*x+offset) % 256) ^ ((2*y+offset) % 256);
                var blue = 50 + Math.floor(Math.random()*100);

                // Rotate the colors
                blue = (blue + offset) % 256;

                // Set the pixel data
                var pixelindex = (y * width + x) * 4;
                this.imagedata.data[pixelindex] = red;     // Red
                this.imagedata.data[pixelindex+1] = green; // Green
                this.imagedata.data[pixelindex+2] = blue;  // Blue
                this.imagedata.data[pixelindex+3] = 255;   // Alpha
            }
        }

        this.ctx.putImageData(this.imagedata, 0, 0)
    }
}
