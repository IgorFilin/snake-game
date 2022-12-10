export const CreateArrayGrid = (row:number,column:number) => {
    let arr = []
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            arr.push({row:i,column:j})
        }
    }
    return arr
}