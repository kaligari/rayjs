export default class Color {
    constructor(red, green, blue) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    multiply(value) {
        return new Color(this.red * value, this.green * value, this.blue * value)
    }
    add(color){
        this.red += color.red
        this.green += color.green
        this.blue += color.blue
    }
}
