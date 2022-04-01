import { DropResult } from "react-smooth-dnd";

export const applyDrag = (arr: number[], dropResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dropResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr] as any;
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const sortItemsByPositions = (items: any, positions: number[]) => {
  items.sort((a: any, b: any) => positions.indexOf(a.id) - positions.indexOf(b.id));
  return items;
};
