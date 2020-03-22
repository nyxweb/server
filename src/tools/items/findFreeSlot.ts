const findFreeSlot = (
  slots: number[][],
  x: number,
  y: number
): { slot: false | number; updatedSlots: number[][] } => {
  let emptySlot: false | number = false;
  let updatedSlots;

  for (let row = 0; row < slots.length; row++) {
    if (emptySlot !== false) {
      break;
    }

    for (let column = 0; column < slots[row].length; column++) {
      let isEmpty = true;
      if (!slots[row][column]) {
        // found free slot, check the rest (x, y)
        updatedSlots = [...slots];
        for (let _x = 0; _x < x; _x++) {
          for (let _y = 0; _y < y; _y++) {
            if (
              typeof slots[row + _y] === 'undefined' ||
              typeof slots[row + _y][column + _x] === 'undefined' ||
              slots[row + _y][column + _x] === 1
            ) {
              // slot is busy, we break out and try the next slot
              isEmpty = false;
              break;
            }
            updatedSlots[row + _y][column + _x] = 1;
          }
        }
      } else {
        isEmpty = false;
      }

      if (isEmpty) {
        emptySlot = (row + 1) * 8 - (8 - column);
        break;
      }
    }
  }

  return {
    slot: emptySlot,
    updatedSlots
  };
};

export default findFreeSlot;
