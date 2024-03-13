import React, { useEffect, useState } from "react";
import "./App.css";

// interpolate between predefined colors in an array
type Color = [number, number, number];
const colorsArray: [number, Color][] = [
  [-10, [0, 0, 255]],
  [10, [4, 226, 211]],
  [30, [238, 255, 0]],
  [50, [255, 0, 0]],
];

// takes 2 colors and an an alpha value, interpolates between their rgb value, returns new color
const colorLerp = (color1: Color, color2: Color, alpha: number): Color => {
  const red = (color2[0] - color1[0]) * alpha + color1[0];
  const green = (color2[1] - color1[1]) * alpha + color1[1];
  const blue = (color2[2] - color1[2]) * alpha + color1[2];

  return [red, green, blue];
};

const minTemperature = -50;
const maxTemperature = 60;

const minScaleTemperature = -10;
const maxScaleTemperature = 40;
const scale = maxScaleTemperature - minScaleTemperature;

const stepSize = 1;

const TemperatureControl = () => {
  const [temperature, setTemperature] = useState(15);

  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    // const temp = temperature - minScaleTemperature;
    // const scalePercentage = Math.min(1, Math.max(0, temp / scale));

    const stops = [colorsArray[0], colorsArray[0]];

    for (let i = 0; i < colorsArray.length; i++) {
      if (temperature >= colorsArray[i][0]) {
        stops[0] = colorsArray[i];
        stops[1] = colorsArray[i + 1] ?? stops[0];
      }
    }

    const stopsPercentage = Math.min(
      1,
      Math.max(0, (temperature - stops[0][0]) / (stops[1][0] - stops[0][0]))
    );

    const newColor = colorLerp(stops[0][1], stops[1][1], stopsPercentage);

    setBgColor(`rgb(${newColor[0]},${newColor[1]},${newColor[2]})`);
  }, [temperature]);

  return (
    <div className="app-container">
      <div className="temp-container" style={{ backgroundColor: bgColor }}>
        <p>{temperature}</p>
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            setTemperature((previousTemp) => previousTemp + stepSize);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setTemperature((previousTemp) => previousTemp - stepSize);
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default TemperatureControl;
