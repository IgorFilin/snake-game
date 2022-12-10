import {getRandomGrid} from "./getRandomGrid";

export const CreateArrayGrid = (row:number,column:number) => {
    let arr = []
    const foot = getRandomGrid(row,column)
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            const isFood = foot.row === i && foot.col === j
            arr.push({row:i,column:j,isFood})
        }
    }
    return arr
}