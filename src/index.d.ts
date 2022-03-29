declare module "values.js" {

  export = Values

  class Values {
    constructor(color?: string, type?: 'base' | 'tint' | 'shade', weight?: number)
    alpha: number
    rgb: [number, number, number]
    type: string
    weight: number
    hex: string
    setColor(color: string): Values
    tint(weight?: number): Values
    tints(weight?: number): Values[]
    shade(weight?: number): Values
    shades(weight?: number): Values[]
    all(weight?: number): Values[]
    hexString(): string
    rgbString(): string
    getBrightness(): number
  }
}
