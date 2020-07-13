export const getquickAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  //
  const jsSortedArray = array.slice().sort((a, b) => a - b);
  if (arraysAreEqual(jsSortedArray, array)) return animations;
  //
  const tempArray = array.slice();
  doQuickSort(animations, tempArray, 0, tempArray.length - 1);
  return animations;
};

const arraysAreEqual = (arrayOne, arrayTwo) => {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
};

const swap = (animations, items, leftIdx, rightIdx) => {
  let temp;
  temp = items[leftIdx];
  items[leftIdx] = items[rightIdx];
  items[rightIdx] = temp;

  animations.push([leftIdx, rightIdx]);
};

export const quickSortPartition = (items, left, right, animations) => {
  let pivot = items[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(animations, items, i, j);
      i++;
      j--;
    }
  }
  return i;
};

export const doQuickSort = (animations, tempArray, left, right) => {
  let index;
  if (tempArray.length > 1) {
    index = quickSortPartition(tempArray, left, right, animations);
    if (left < index - 1) {
      doQuickSort(animations, tempArray, left, index - 1);
    }
    if (index < right) {
      doQuickSort(animations, tempArray, index, right);
    }
  }
  return tempArray;
};
