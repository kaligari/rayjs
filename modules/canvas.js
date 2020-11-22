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
        this.width = 320 // this.getWidth
        this.height = 200 // this.getHeight
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.fillStyle = '#000000'
        this.ctx.fillRect(0, 0, this.width, this.height)
    }
}
