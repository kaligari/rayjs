export default class Color {
    _red: number
    _green: number
    _blue: number

    constructor(red: number, green: number, blue: number) {
        this._red = red
        this._green = green
        this._blue = blue
    }

    multiply(value: number) {
        return new Color(this._red * value, this.green * value, this.blue * value)
    }
    add(color: Color){
        this._red += color._red
        this._green += color.green
        this._blue += color.blue
    }

    get red() {
        return Math.min(this._red, 255)
    }

    get green() {
        return Math.min(this._green, 255)
    }

    get blue() {
        return Math.min(this._blue, 255)
    }
}
