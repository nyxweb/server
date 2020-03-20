import hexDecode from './decode';

const generateSlotsHolders = (
  itemsHex: string,
  oneToOneSlot: boolean | number = false,
  itemsList: any
): number[][] | false => {
  const slots: number[][] = [];
  const hexArray = itemsHex.toLowerCase().match(/[a-f0-9]{32}/g);

  if (hexArray.length !== 120) {
    return false;
  }

  Array(hexArray.length)
    .fill(null)
    .forEach((_, i) => {
      const row = Math.floor(i / 8);
      if (slots[row]) {
        slots[row].push(0);
      } else {
        slots[row] = [0];
      }
    });

  hexArray.forEach((hex, i) => {
    if (oneToOneSlot !== i) {
      const row = Math.floor(i / 8);
      const column = Math.floor(i - row * 8);

      if (hex !== 'f'.repeat(32)) {
        const item = hexDecode(hex);
        const itemData =
          item && itemsList[item.group] && itemsList[item.group].items[item.id]
            ? itemsList[item.group].items[item.id]
            : false;

        if (item && itemData) {
          for (let x = 0; x < itemData.x; x++) {
            for (let y = 0; y < itemData.y; y++) {
              if (
                slots[row + y] !== undefined &&
                slots[row + y][column + x] !== undefined
              ) {
                slots[row + y][column + x] = 1;
              }
            }
          }
        } else {
          return false;
        }
      }
    }
  });

  return slots;
};

const isSlotEmpty = (
  slot: number,
  itemHex: string,
  warehouseItems: string,
  /** true if the item is being moved in the same place */
  oneToOne: boolean | number = false,
  itemsList: any
): boolean => {
  const item = hexDecode(itemHex);
  const itemData =
    item && itemsList[item.group] && itemsList[item.group].items[item.id]
      ? itemsList[item.group].items[item.id]
      : false;

  if (!item || !itemData) {
    return false;
  }

  const row = Math.floor(slot / 8);
  const column = Math.floor(slot - row * 8);
  const slots = generateSlotsHolders(warehouseItems, oneToOne, itemsList);
  let isEmpty = true;

  if (!slots) {
    return false;
  }

  for (let x = 0; x < itemData.x; x++) {
    for (let y = 0; y < itemData.y; y++) {
      if (
        slots[row + y] === undefined ||
        slots[row + y][column + x] === undefined ||
        slots[row + y][column + x] !== 0
      ) {
        isEmpty = false;
      }
    }
  }

  return isEmpty;
};

export default { generateSlotsHolders, isSlotEmpty };
