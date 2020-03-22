import { decode } from '.';

interface Item {
  group: number;
  id: number;
  level: number;
  value: number;
}

const findAndRemove = (warehouse: string, items: Item[], fixed: boolean) => {
  const resList: Item[] = [];
  let itemsHex = warehouse;
  let foundCount = 0;

  warehouse.match(/.{32}/g).forEach(hex => {
    if (hex.toLowerCase() !== 'f'.repeat(32)) {
      const decoded = decode(hex);
      if (decoded) {
        const index = items.findIndex(
          r =>
            r.group === decoded.group &&
            r.id === decoded.id &&
            r.level === decoded.level
        );

        if (index >= 0 && (items[index].value || !fixed)) {
          foundCount += 1;
          if (items[index].value > 1) {
            items[index].value -= 1;
          } else if (fixed) {
            items.splice(index, 1);
          }

          // Remove item from the hex
          itemsHex = itemsHex.replace(hex, 'f'.repeat(32));

          // Add item/value to the list
          const findInList = resList.findIndex(
            r =>
              r.group === decoded.group &&
              r.id === decoded.id &&
              r.level === decoded.level
          );

          if (findInList < 0) {
            resList.push({
              group: decoded.group,
              id: decoded.id,
              level: decoded.level,
              value: 1
            });
          } else {
            resList[findInList] = {
              ...resList[findInList],
              value: resList[findInList].value + 1
            };
          }
        }
      }
    }
  });

  return {
    itemsHex,
    resList,
    foundCount
  };
};

export default findAndRemove;
