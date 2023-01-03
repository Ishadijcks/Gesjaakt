export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSV = {
  h: number;
  s: number;
  v: number;
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
      tmpColor.r = Math.floor(color1.r + (i * (color2.r - color1.r)) / steps);
      tmpColor.g = Math.floor(color1.g + (i * (color2.g - color1.g)) / steps);
      tmpColor.b = Math.floor(color1.b + (i * (color2.b - color1.b)) / steps);
      colorList.push(tmpColor);
    }
    return colorList;
  }

  public static createHsvColorRange(
    h1: number,
    h2: number,
    s: number,
    v: number,
    steps: number
  ): HSV[] {
    const colorList = [];
    for (let i = 0; i < steps; i++) {
      colorList.push({
        h: h1 + (i / steps) * (h2 - h1),
        s: s,
        v: v,
      });
    }
    return colorList;
  }

  public static toRgb(hsv: HSV): RGB {
    const f = (n: number, k: number = (n + hsv.h / 60) % 6) => {
      return hsv.v - hsv.v * hsv.s * Math.max(Math.min(k, 4 - k, 1), 0);
    };

    return {
      r: Math.floor(f(5) * 255),
      g: Math.floor(f(3) * 255),
      b: Math.floor(f(1) * 255),
    };
  }

  public static toHex(rgb: RGB): string {
    const r = rgb.r.toString(16).padStart(2, "0");
    const g = rgb.g.toString(16).padStart(2, "0");
    const b = rgb.b.toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
}
