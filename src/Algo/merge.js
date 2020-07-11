export const mergeAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  const tempArray = array.slice();
  mergeSort(array, 0, array.length - 1, tempArray, animations);
  return animations;
};

const mergeSort = (mainArray, startIdx, endIdx, tempArray, animations) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(tempArray, startIdx, middleIdx, mainArray, animations);
  mergeSort(tempArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, tempArray, animations);
};

const doMerge = (
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  tempArray,
  animations
) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    //the below two push is just for animation puropse

    //For first animated comparison we have to push them
    //to change the color
    animations.push([i, j]);

    //Second push for the bars to gain their
    //original color
    animations.push([i, j]);

    // actual comparison
    if (tempArray[i] <= tempArray[j]) {
      //this push overwrites the actual bars
      animations.push([k, tempArray[i]]);
      mainArray[k++] = tempArray[i++];
    } else {
      //this push is also to overwrite the bars
      animations.push([k, tempArray[j]]);
      mainArray[k++] = tempArray[j++];
    }
  }

  //Check for any remainings
  while (i <= middleIdx) {
    //The below two push are just similar as above and
    // is done only to animate
    animations.push([i, i]);
    animations.push([i, i]);

    //This push actually overwrites the values
    animations.push([k, tempArray[i]]);
    mainArray[k++] = tempArray[i++];
  }

  while (j <= endIdx) {
    //The below two push are just similar as above and
    // is done only to animate
    animations.push([j, j]);
    animations.push([j, j]);

    //This push actually overwrites the values
    animations.push([k, tempArray[j]]);
    mainArray[k++] = tempArray[j++];
  }
};
