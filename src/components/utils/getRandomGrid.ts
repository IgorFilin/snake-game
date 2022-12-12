export const getRandomGrid = (row: number, column: number) => {
  return {
    row: Math.floor(Math.random() * row),
    column: Math.floor(Math.random() * column),
  };
};
