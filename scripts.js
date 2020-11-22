import Vector from './modules/vector.js'
import Point from './modules/point.js'
import Sphere from './modules/sphere.js'
import Scene from './modules/scene.js'
import RendererEngine from './modules/rendererEngine.js'

const camera = new Vector(0, 0, -1)
const objects = [
    new Sphere(new Point(0, 0, 0), 0.5, '#ff0000')
]
const scene = new Scene(camera, objects)
const engine = new RendererEngine(scene)

const render = () => {
    engine.render(scene)
    // window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
    engine.init()
    render()
})

engine.init()
render()
