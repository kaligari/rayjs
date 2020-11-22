import Vector from './modules/vector.js'
import Canvas from './modules/canvas.js'

const canvas = new Canvas()

const render = () => {
    // window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
    canvas.init()
    render()
})

canvas.init()
render()
