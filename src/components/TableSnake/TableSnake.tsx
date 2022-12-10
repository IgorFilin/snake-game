import React, {useEffect, useState} from 'react';
import s from './TableSnake.module.scss'

export const TableSnake = () => {
const [item,setItem] = useState({
    row:10 as number,
    column:10,
    arrItems:[] as Array<{row:number,column:number}>
})
    console.log(item)


   useEffect(() => {
       let arr = []
           for (let i = 0; i < item.row; i++) {
               for (let j = 0; j < item.column; j++) {
                   arr.push({row:i,column:j})
               }
           }
           setItem({...item,arrItems: [...arr]})
   },[])


    return (
        <div className={s.mainContainer}>
                 <div className={s.tableSnake}>
                     {item.arrItems.map((it)=> <div key={it.row + '' + it.column} className={s.tableItem}></div>)}
                 </div>
        </div>
    );
};

