import Color from "./color"

export default class Material {
    color: Color
    ambient: f64
    diffuse: f64
    specular: f64

    constructor(color: Color, ambient: f64 = 0.05, diffuse: f64 = 1, specular: f64 = 1) {
        this.color = color
        this.ambient = ambient
        this.diffuse = diffuse
        this.specular = specular
    }

    colorAt(): Color {
        return this.color
    }
}
