import React, { useState, useEffect } from "react";
import "./VisualSort.css";
import { mergeAnimations } from "../Algo/merge";
import { getbubbleSortAnimations } from "../Algo/bubble";
import {
  getquickAnimations,
  doQuickSort,
  quickSortPartition,
} from "../Algo/quickSort";
import { getInsertionSortAnimations } from "../Algo/insertion";

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
    const animations = getbubbleSortAnimations(array);
    //console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange) {
        console.log(animations[i]);
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * TIME_MS);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * TIME_MS);
      }
    }
  };

  const quickSort = () => {
    const animations = getquickAnimations(array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        let [barOneIdx, barTwoIdx] = animations[i];
        let tempAimations = [];
        let index;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        if (array.length > 1) {
          index = quickSortPartition(array, 0, array.length - 1, tempAimations); //index returned from partition
          if (0 < index - 1) {
            //more elements on the left side of the pivot
            doQuickSort(tempAimations, array, 0, index - 1);
          }
          if (index < array.length) {
            //more elements on the right side of the pivot
            doQuickSort(tempAimations, array, 0, array.length - 1);
          }
        }

        barOneStyle.height = `${array[barOneIdx]}px`;
        barTwoStyle.height = `${array[barTwoIdx]}px`;

        barOneStyle.backgroundColor = "green";
        barTwoStyle.backgroundColor = "red";

        let currentPosition = barOneIdx;
        for (let j = 0; j < currentPosition; j++) {
          let jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = "green";
        }
        if (i === animations.length - 1) {
          makeAllBarsGreen();
        }
      }, i*TIME_MS);
    }
  };

  const insertionSort = () => {
    const [animations] = getInsertionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange) {
        const color =
          animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * TIME_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * TIME_MS);
      }
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
      <button onClick={quickSort}>Quick Sort</button>
      <button onClick={insertionSort}>Insertion Sort</button>
    </div>
  );
};

export default VisualSort;
