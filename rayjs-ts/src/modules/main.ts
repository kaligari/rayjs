import Point from './point'
import Sphere from './sphere'
import Scene from './scene'
import Color from './color'
import RendererEngine from './rendererEngine'
import Light from './light'
import Material from './material'
import Animations from './animations'

export const width = 300
export const height = 300
export const engine = new RendererEngine(width, height)
export const render = () => {
    engine.render(scene)
    ball1Animation.animate(engine.delta)
    ball2Animation.animate(engine.delta)
    lightAnimation.animate(engine.delta)
}

const camera = new Point(0, 0, -1)
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
const ball1Animation = new Animations(objects[1].center, 180, .65, 2)
const ball2Animation = new Animations(objects[2].center, 0, .8, 1)
const lightAnimation = new Animations(lights[0].position, 0, 1.8, 3)
