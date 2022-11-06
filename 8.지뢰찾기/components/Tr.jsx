import React, { useContext } from 'react';
import Td from './Td';
import {TableContext} from './MineSearch'

const Tr = ( {rowIndex} ) => {
    const { tableData } = useContext(TableContext);
    return (
        <tr>
            {/* {Array(tableData.length).fill().map( (td, i) => <Td key={i}></Td>)} */}
            {tableData[0] && Array(tableData[0].length).fill().map( (td, i) => <Td key={i} rowIndex={rowIndex} cellIndex={i}></Td>)}
        </tr>
    );

}



export default Tr;