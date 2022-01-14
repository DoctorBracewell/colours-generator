import "./style.css";
import { randomBetween } from "drbracewell-random-tools";

// https://stackoverflow.com/a/44134328
function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Generator function
document.querySelector("#generate").addEventListener("click", () => {
  // Generate random HSL values from min and max values for each;
  const [hue, saturation, lightness] = [
    [0, 360],
    [1, 100],
    [20, 80],
  ].map(([min, max]) => randomBetween(min, max));

  // For each alternative colour to be generated, store HTML element selector and the function to generate the colour based off transformed HSL values
  const paletteData = [
    {
      selector: "root",
      transform: (h, s, l) => hslToHex(h, s, l),
    },
    {
      selector: "lighter",
      transform: (h, s, l) => hslToHex(h, s, l + 10),
    },
    {
      selector: "darker",
      transform: (h, s, l) => hslToHex(h, s, l - 10),
    },
    {
      selector: "complement",
      transform: (h, s, l) =>
        h < 180 ? hslToHex(h + 180, s, l) : hslToHex(h - 180, s, l),
    },
  ];

  // Then just loop through the data, generate the colour and apply it to the element
  for (const colour of paletteData) {
    const hex = colour.transform(hue, saturation, lightness);

    document.querySelector(
      `#${colour.selector}Background`
    ).style.backgroundColor = hex;

    document.querySelector(`#${colour.selector}Text`).textContent = hex;
  }
});
