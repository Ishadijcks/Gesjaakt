export type RGB = {
  r: number;
  g: number;
  b: number;
};

export class Colors {
  public static createColorRange(
    color1: RGB,
    color2: RGB,
    steps: number
  ): RGB[] {
    const colorList = [];
    let tmpColor: RGB;
    for (let i = 0; i < steps; i++) {
      tmpColor = { r: 0, g: 0, b: 0 };
      tmpColor.r = color1.r + (i * (color2.r - color1.r)) / steps;
      tmpColor.g = color1.g + (i * (color2.g - color1.g)) / steps;
      tmpColor.b = color1.b + (i * (color2.b - color1.b)) / steps;
      colorList.push(tmpColor);
    }
    return colorList;
  }

  public static toHex(c: RGB): string {
    return `#${c.r.toString(16)}${c.g.toString(16)}${c.r.toString(16)}`;
  }
}
