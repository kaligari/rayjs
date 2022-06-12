import Color from "./color"

export default class Material {
    color: Color
    ambient: number
    diffuse: number
    specular: number

    constructor(color: Color, ambient = 0.05, diffuse = 1, specular = 1) {
        this.color = color
        this.ambient = ambient
        this.diffuse = diffuse
        this.specular = specular
    }

    colorAt() {
        return this.color
    }
}
