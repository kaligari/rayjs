import Vector from './modules/vector.js'
import Point from './modules/point.js'
import Sphere from './modules/sphere.js'
import Scene from './modules/scene.js'
import Color from './modules/color.js'
import RendererEngine from './modules/rendererEngine.js'

const width = 1024
const height = 768

const getWidth = () => window.innerWidth
const getHeight = () => window.innerHeight

const camera = new Vector(0, 0, -1)
const objects = [
    new Sphere(new Point(0, 0, 0), 0.5, new Color(255, 0, 0))
]
const scene = new Scene(camera, objects, width, height)
const engine = new RendererEngine(scene)

const render = () => {
    engine.render(scene)
    // window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
    engine.init(width, height)
    render()
})

engine.init(width, height)
render()
