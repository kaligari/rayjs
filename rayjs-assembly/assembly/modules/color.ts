export default class Color {
    red: u32
    green: u32
    blue: u32

    constructor(red: u32, green: u32, blue: u32) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    multiply(value: u32): Color {
        return new Color(this.red * value, this.green * value, this.blue * value)
    }
    add(color: Color): void {
        this.red += color.red
        this.green += color.green
        this.blue += color.blue
    }
}
