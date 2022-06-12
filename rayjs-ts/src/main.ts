import './style.css'
import Vector from './modules/vector'
import Point from './modules/point'
import Sphere from './modules/sphere'
import Scene from './modules/scene'
import Color from './modules/color'
import RendererEngine from './modules/rendererEngine'
import Light from './modules/light'
import Material from './modules/material'
import Animations from './modules/animations'

const width = 320
const height = 240
// const width = 640
// const height = 480

const getWidth = () => window.innerWidth
const getHeight = () => window.innerHeight

const camera = new Vector(0, 0, -2)
const objects = [
    new Sphere(new Point(0, 0, 0), 0.5,
        new Material(
            new Color(255, 0, 0)
        )
    ),
    new Sphere(new Point(0, 0, 0), 0.05,
        new Material(
            new Color(0, 0, 255)
        )
    ),
    new Sphere(new Point(0, 0, 0), 0.05,
        new Material(
            new Color(0, 255, 0)
        )
    )
]
const lights = [
    new Light(new Point(1.5, -0.5, -2), new Color(255, 255, 255))
]
const scene = new Scene(camera, objects, lights, width, height)
const engine = new RendererEngine()
const animation1 = new Animations(objects[1], 180, .65, .2)
const animation2 = new Animations(objects[2], 0, .8, .1)

const render = () => {
    engine.render(scene)
    animation1.animate()
    animation2.animate()
    window.requestAnimationFrame(render)
}

const init = () => {
    engine.init(width, height)
    render()
}

window.addEventListener('resize', () => {
    init()
})

init()