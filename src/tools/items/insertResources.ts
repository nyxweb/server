import { findFreeSlot, generate, slotsMatrix } from '.';

interface Item {
  group: number;
  id: number;
  level: number;
  value: number;
}

const insertResources = (warehouse: string, itemsDB: any, items: Item[]) => {
  const resList: Item[] = [];
  let itemsHex = warehouse;
  let insertCount = 0;
  let slots = slotsMatrix(itemsHex, itemsDB);

  for (const item of items) {
    if (
      item.value &&
      itemsDB[item.group] &&
      itemsDB[item.group].items[item.id]
    ) {
      for (let i = 0; i < item.value; i++) {
        const itemData = itemsDB[item.group].items[item.id];
        const { slot, updatedSlots } = findFreeSlot(
          slots,
          itemData.x,
          itemData.y
        );
        slots = updatedSlots;

        if (slot !== false) {
          const itemHex = generate({
            group: item.group,
            id: item.id,
            level: item.level
          });

          if (itemHex) {
            insertCount += 1;
            itemsHex =
              itemsHex.slice(0, slot * 32) +
              itemHex +
              itemsHex.slice((slot + 1) * 32);

            // Add item/value to the list
            const findInList = resList.findIndex(
              r =>
                r.group === item.group &&
                r.id === item.id &&
                r.level === item.level
            );

            if (findInList < 0) {
              resList.push({
                group: item.group,
                id: item.id,
                level: item.level,
                value: 1
              });
            } else {
              resList[findInList].value += 1;
            }
          }
        } else {
          break;
        }
      }
    }
  }

  return {
    itemsHex,
    insertCount,
    resList
  };
};

export default insertResources;
