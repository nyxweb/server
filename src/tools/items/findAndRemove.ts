import hexDecode from './decode';

interface Item {
  group: number;
  id: number;
  level: number;
  value: number;
}

const findAndRemove = (warehouse: string, items: Item[]) => {
  const resList: Item[] = [];
  let itemsHex = warehouse;
  let foundCount = 0;

  warehouse.match(/.{32}/g).forEach(hex => {
    if (hex.toLowerCase() !== 'f'.repeat(32)) {
      const decoded = hexDecode(hex);
      if (decoded) {
        const match = items.find(
          r =>
            r.group === decoded.group &&
            r.id === decoded.id &&
            r.level === decoded.level
        );

        if (match) {
          foundCount += 1;
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
            resList[findInList].value += 1;
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
