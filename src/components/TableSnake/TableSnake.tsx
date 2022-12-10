import React, {useEffect, useState} from 'react';
import s from './TableSnake.module.scss'
import {CreateArrayGrid} from "../utils/CreateArrayGrid";


export const TableSnake = () => {
const [item,setItem] = useState({
    row: 10 as number,
    column:10 as number,
    arrItems:[] as Array<{row:number,column:number,isFood:boolean}>
})
    console.log(item.arrItems)
   useEffect(() => {
           const arrayGrid = CreateArrayGrid(item.row,item.column)
           setItem({...item,arrItems: [...arrayGrid]})
   },[])


    return (
        <div className={s.mainContainer}>
                 <div className={s.tableSnake}>
                     {item.arrItems.map((it)=> <div key={it.row + '' + it.column} className={it.isFood ? s.tableFoot :s.tableItem}></div>)}
                 </div>
        </div>
    );
};

