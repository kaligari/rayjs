export default class Canvas {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number
    height: number

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.width = 320 // this.getWidth
        this.height = 200 // this.getHeight
        this.canvas.width = this.width
        this.canvas.height = this.height
    }

    get getWidth() {
        return window.innerWidth
    }

    get getHeight() {
        return window.innerHeight
    }

    init() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.fillStyle = '#000000'
        this.ctx.fillRect(0, 0, this.width, this.height)
    }
}
