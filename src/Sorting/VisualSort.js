import React, { useState, useEffect } from "react";
import "./VisualSort.css";
import { mergeAnimations } from "../Algo/merge";
import { bubbleAnimation } from "../Algo/bubble";

const VisualSort = () => {
  const [array, setarray] = useState([]);

  const PRIMARY_COLOR = "blue";
  const SECONDARY_COLOR = "red";
  const TIME_MS = 3;

  const resetArray = () => {
    const genArray = [];
    for (let i = 0; i < 300; i++) {
      genArray.push(randomNumber(5, 500));
    }
    setarray(genArray);
  };

  useEffect(() => {
    resetArray();
  }, []);

  const mergeSort = () => {
    const animations = mergeAnimations(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * TIME_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barStyleOne = arrayBars[barOneIdx].style;
          barStyleOne.height = `${newHeight}px`;
        }, i * TIME_MS);
      }
    }
  };

  const bubbleSort = () => {
    const animations = bubbleAnimation(array);
    let arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [barOneIdx, barTwoIdx] = animations[i];

        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        let temp = array[barOneIdx];
        array[barOneIdx] = array[barTwoIdx];
        array[barTwoIdx] = temp;

        barOneStyle.height = `${array[barOneIdx]}px`;
        barTwoStyle.height = `${array[barTwoIdx]}px`;

        barOneStyle.backgroundColor = "red";
        barTwoStyle.backgroundColor = "green";

        let currentPosition = barOneIdx;
        for (let j = 0; j < currentPosition; j++) {
          let jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = "blue";
        }
        if (i === animations.length - 1) {
          makeAllBarsGreen();
        }
      }, i * TIME_MS);
    }
  };

  const makeAllBarsGreen = () => {
    let arrayBars = document.getElementsByClassName("array-bar");
    for (let j = 0; j < arrayBars.length; j++) {
      let jBarStyle = arrayBars[j].style;
      jBarStyle.backgroundColor = "blue";
    }
  };

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{ height: `${value}px` }}
        ></div>
      ))}
      <br />
      <br />
      <button onClick={resetArray}>Random array</button>
      <button onClick={mergeSort}>Merge Sort</button>
      <button onClick={bubbleSort}>Bubble sort</button>
    </div>
  );
};

export default VisualSort;
