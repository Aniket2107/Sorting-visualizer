export const bubbleAnimation = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  let tempArray = array.slice();
  doBubbleSort(animations, tempArray);

  return animations;
};

const doBubbleSort = (animations, tempArray) => {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < tempArray.length - 1; i++) {
      if (tempArray[i] > tempArray[i + 1]) {
        let temp = tempArray[i];
        tempArray[i] = tempArray[i + 1];
        tempArray[i + 1] = temp;
        animations.push([i, i + 1]);
        swapped = true;
      }
    }
  } while (swapped);
};
