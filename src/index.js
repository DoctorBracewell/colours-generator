import "../style/index.css";

import "./favicon.js";
import { paletteData } from "./colourData.js";
import { randomBetween } from "drbracewell-random-tools";

// Generator function
document.querySelector("#generate").addEventListener("click", () => {
  // Generate random HSL values from min and max values for each;
  const [hue, saturation, lightness] = [
    [0, 360],
    [1, 100],
    [20, 80],
  ].map(([min, max]) => randomBetween(min, max));

  // Then just loop through the data, generate the colour and apply it to the element
  for (const colour of paletteData) {
    const hex = colour.transform(hue, saturation, lightness);

    document.querySelector(
      `#${colour.selector}Background`
    ).style.backgroundColor = hex;

    document.querySelector(`#${colour.selector}Text`).textContent = hex;
  }
});
