import Vector from './modules/vector.js'
import Canvas from './modules/canvas.js'

const canvas = new Canvas()

const vect = new Vector(1, -2, -2)
const vect2 = new Vector(3, 6, 9)

console.log(vect.normalize)

const render = () => {
    // window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
    canvas.init()
    render()
})

canvas.init()
render()
