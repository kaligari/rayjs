export default class Material {
    constructor(color, ambient = 0.05, diffuse = 1, specular = 1) {
        this.color = color
        this.ambient = ambient
        this.diffuse = diffuse
        this.specular = specular
    }

    colorAt(position) {
        return this.color
    }
}
