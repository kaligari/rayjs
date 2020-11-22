export default class Canvas {
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
        this.canvas.width = this.getWidth
        this.canvas.height = this.getHeight
        this.ctx.clearRect(0, 0, this.getWidth, this.getHeight)
        this.ctx.fillStyle = '#000000'
        this.ctx.fillRect(0, 0, this.getWidth, this.getHeight)
    }
}
