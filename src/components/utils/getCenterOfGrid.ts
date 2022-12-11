export const getCenterOfGrid = (row: number, column: number) => {
  return {
    row: Math.floor((row - 1) / 2),
    col: Math.floor((column - 1) / 2),
  };
};
