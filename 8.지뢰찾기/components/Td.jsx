import React, { useContext } from 'react';
import {TableContext, CODE} from './MineSearch';


const getTdStyle = (code) => {
    switch(code){
        case CODE.MINE:
        case CODE.NORMAL:
            return {
                background: '#999'
            }
        case CODE.OPENED:
            return {
                background: '#fff'
            }
        default:
            return {
                background: '#fff'
            }
    }
}
const getTdText = (code) => {
    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        default:
            return '';
    }
}


const Td = ({rowIndex, cellIndex}) => {

    const { tableData } = useContext(TableContext);

    return (
        <td style = {getTdStyle(tableData[rowIndex][cellIndex])}>
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    );

}


export default Td;