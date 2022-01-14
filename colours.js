function hueToRGB(p, q, t)  {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

const toHex = x => {
  const hex = Math.round(x * 255).toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

function hslToHex(h, s, l) {
  const hue = h / 360;
  const saturation = s / 100;
  const lightness = l / 100;

  let r, g, b;

  if (saturation === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRGB(p, q, h + 1 / 3);
    g = hueToRGB(p, q, h);
    b = hueToRGB(p, q, h - 1 / 3);
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


function generateColours() {

  const h = Math.round(Math.random() * (360 - 0 + 1) + 0);
  const s = Math.round(Math.random() * (100 - 1 + 1) + 1);
  const l = Math.round(Math.random() * (80 - 20 + 1) + 20);

  const hex = hslToHex(h, s, l);

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
