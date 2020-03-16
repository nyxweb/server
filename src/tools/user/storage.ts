const hex2dec = (hex: string) => parseInt(hex, 16);

const hexDecode = (hex: string) => {
  if (!/^[a-f0-9]{32}$/i.test(hex) || hex.toLowerCase() === 'f'.repeat(32)) {
    return false;
  }

  const opts = hex2dec(hex.substr(2, 2));
  const exos = hex2dec(hex.substr(14, 2));

  const excellent = Array(6)
    .fill('')
    .map((_, i) => (exos >> i) & 0b1);

  const group = hex2dec(hex.substr(18, 1));
  const id = hex2dec(hex.substr(0, 2));
  const luck = !!((opts >> 2) & 0b1);
  const level = (opts >> 3) & 0b1111;
  const skill = !!((opts >> 7) & 0b1);
  const options = (opts & 0b11) | (((exos >> 6) & 0b1) << 2);
  const ancient = hex2dec(hex.substr(16, 2));
  const serial = hex.substr(6, 8);
  const durability = hex2dec(hex.substr(4, 2));
  const pink = !!hex2dec(hex.substr(19, 1));
  const harmony = {
    type: hex2dec(hex.substr(20, 1)),
    level: hex2dec(hex.substr(21, 1))
  };

  return {
    group,
    id,
    luck,
    level,
    skill,
    options,
    ancient,
    serial,
    durability,
    excellent,
    pink,
    harmony
  };
};

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

export { hexDecode, generateSlotsHolders, isSlotEmpty };
