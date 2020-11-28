function generateColours() {
  function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  let h = Math.round(Math.random() * (360 - 0 + 1) + 0);
  let s = Math.round(Math.random() * (100 - 1 + 1) + 1);
  let l = Math.round(Math.random() * (80 - 20 + 1) + 20);

  let hex = hslToHex(h, s, l);
  document.querySelector(".root").style.backgroundColor = hex;
  document.querySelector("#rootColour").innerHTML = hex;

  if (h < 180) {
    var hexC = hslToHex(h + 180, s, l);
  } else {
    var hexC = hslToHex(h - 180, s, l);
  }
  document.querySelector(".comp").style.backgroundColor = hexC;
  document.querySelector("#compColour").innerHTML = hexC;

  let hexL = hslToHex(h, s, l + 10);
  document.querySelector(".tenLight").style.backgroundColor = hexL;
  document.querySelector("#lightColour").innerHTML = hexL;

  let hexD = hslToHex(h, s, l - 10);
  document.querySelector(".tenDark").style.backgroundColor = hexD;
  document.querySelector("#darkColour").innerHTML = hexD;
}
