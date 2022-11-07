import React, { useReducer, createContext, useMemo } from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, //0 이상이면 다 Opened
}

//createContext
export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () =>{}
});

//useReducer - initialState
const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result:'',
  halted: false
}


//plantMine
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  //테이블 만들기
  const candidate = Array(row*cell).fill().map((arr,i) => {
    return i;
  });
  const shuffle = [];
  while(candidate.length > row*cell - mine){
    const chosen = candidate.splice(Math.floor(Math.random()* candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  //전체 칸 -1로 설정
  const data = [];
  for (let i = 0; i < row; i++){
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++){
      rowData.push(CODE.NORMAL);
    }
  }
  //지뢰 심기
  for (let k = 0; k < shuffle.length; k++){
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data)
  return data;
}


export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
const reducer = (state, action) => {
  switch(action.type){
    case START_GAME:
      console.log('case START_GAME');
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false
      }

    case OPEN_CELL:{
      console.log('case OPEN_CELL');
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED; //클릭한 셀(칸)이 OPEND로 변경

      return {
        ...state,
        tableData
      }
    }

    case CLICK_MINE:{
      console.log('case CLICK_MINE');
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE

      return {
        ...state,
        tableData,
        halted: true //게임 중단
      }
    }

    case FLAG_CELL:{
      console.log('case FLAG_CELL');
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE
      }
      else {
        tableData[action.row][action.cell] = CODE.FLAG
      }
      return {
        ...state,
        tableData
      }
    }
    case QUESTION_CELL:{
      console.log('case QUESTION_CELL');
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE
      }
      else {
        tableData[action.row][action.cell] = CODE.QUESTION
      }
      return {
        ...state,
        tableData
      }
    }
    case NORMALIZE_CELL:{
      console.log('case NORMALIZE_CELL');
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE
      }
      else {
        tableData[action.row][action.cell] = CODE.NORMAL
      }
      return {
        ...state,
        tableData
      }
    }
  
    default:
      return state
  }

}



//MineSearch
const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;
  const value = useMemo( () => ({tableData, halted, timer, result, dispatch }), [tableData, halted])

  //dispatch={dispatch}
  return (
    <div id="container">
      <TableContext.Provider value={ value }>
        <Form ></Form>

        <p>{state.timer}</p>

        <Table ></Table>

        <div>{state.result}</div>
      </TableContext.Provider>
    </div>
  );

}



export default MineSearch;