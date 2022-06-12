export default class Color {
    _red: u8
    _green: u8
    _blue: u8

    constructor(red: u8, green: u8, blue: u8) {
        this._red = red as u8
        this._green = green as u8
        this._blue = blue as u8
    }

    multiply(value: u8): Color {
        return new Color(this._red * value, this.green * value, this.blue * value)
    }
    add(color: Color): void {
        this._red += color._red
        this._green += color.green
        this._blue += color.blue
    }

    get red(): u8 {
        return this._red
        // return Math.min(this._red, 255)
    }

    get green(): u8 {
        return this._green
        // return Math.min(this._green, 255)
    }

    get blue(): u8 {
        return this._blue
        // return Math.min(this._blue, 255)
    }
}
