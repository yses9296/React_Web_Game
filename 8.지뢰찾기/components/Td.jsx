import React, { useCallback, useContext, memo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';


const getTdStyle = (code) => {
    switch(code){
        case CODE.MINE:
        case CODE.NORMAL:
            return {
                background: '#999'
            }
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: '#fff'
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'green'
            }
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow'
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
        case CODE.CLICKED_MINE:
            return 'BOMB!';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';

        default:
            return code || '';
    }
}


const Td = memo(({rowIndex, cellIndex}) => {

    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted){
            return;
        }

        switch(tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch( {type: OPEN_CELL, row: rowIndex, cell: cellIndex} )
                return;
            case CODE.MINE:
                dispatch( {type: CLICK_MINE, row: rowIndex, cell: cellIndex} )
                return;
            default:
                return;
        }

    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback( (e) => {
        e.preventDefault();
        console.log('onRightClickTd');

        if(halted){
            return;
        }

        switch(tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch( {type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch( {type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch( {type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
        
    },[tableData[rowIndex][cellIndex], halted]);

    console.log('td rendered');

    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]}></RealTd>

});

const RealTd = memo( ({onClickTd, onRightClickTd, data}) => {
    console.log('real td rendered');
    return (
        <td style = {getTdStyle(data)} onClick={onClickTd} onContextMenu={onRightClickTd}>
            {getTdText(data)}
        </td>
    );
});

export default Td;