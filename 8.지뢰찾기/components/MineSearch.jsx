import React, { useReducer, createContext, useMemo, useEffect } from 'react';
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
  halted: true,
  opendCount: 0
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
export const INCREAMENT_TIMER = 'INCREAMENT_TIMER';
const reducer = (state, action) => {
  switch(action.type){
    case START_GAME:
      console.log('case START_GAME');
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        data: {
          row: action.row, 
          cell: action.cell, 
          mine: action.mine
        },
        timer: 0,
        result:'',
        halted: false,
        openedCount: 0,
      }

    case OPEN_CELL:{
      console.log('case OPEN_CELL');
      const tableData = [...state.tableData];
      // tableData[action.row] = [...state.tableData[action.row]];
      // tableData[action.row][action.cell] = CODE.OPENED; //클릭한 셀(칸)이 OPEND로 변경
      tableData.forEach( (row,i) => {
        // tableData[i] = [...row]
        tableData[i] = [...state.tableData[i]]
      })

      //주변 지뢰 존재 여부 찾기
      let openedCount = 0;
      const checked = []; //이미 연 칸은 다시 열지 않도록 캐싱
      const checkAround = ( (row, cell) => {
        // console.log(row, cell)
        if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][cell])){
          return;
        }
        if( row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){ //상하좌우 칸이 아닌 경우 필터링
          return;
        }
        if(checked.includes(row + ',' + cell)){ //이미 검사한 칸이면
          return ;
        }
        else{
          checked.push(row + ',' + cell)
        }

        let around = [];
        if(tableData[row-1]){ // 찾고자 하는 셀 위에 줄이 존재하면
          around = around.concat(
            tableData[row -1][cell -1],
            tableData[row -1][cell],
            tableData[row -1][cell +1],
          )
        }
        around = around.concat(  // 찾고자 하는 셀이 해당하는 줄에서 검사
          tableData[row][cell -1],
          tableData[row][cell +1],
        )
        if(tableData[action.row+1]){  // 찾고자 하는 셀 아래에 줄이 존재하면
          around = around.concat(
            tableData[row +1][cell -1],
            tableData[row +1][cell],
            tableData[row +1][cell +1],
          )
        }
        const count = around.filter( v => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length //주변 지뢰 수 세기
        
        //주변 지뢰가 0인 모든 셀 열기 (재귀)
        if(count === 0){
          if (row > -1) {
            const near = [];
            if(row - 1 > -1){ //내가 맨 위의 줄 칸을 선택했을 때 윗줄은 없기에 해당 X
              near.push([row-1, cell -1])
              near.push([row-1, cell])
              near.push([row-1, cell +1])
            }
            near.push([row, cell -1])
            near.push([row, cell +1]) 
            if(row + 1 < tableData.length){ //내가 맨 아래의 줄 칸을 선택했을 때 아랫줄은 없기에 해당 X
              near.push([row +1, cell -1])
              near.push([row +1, cell])
              near.push([row +1, cell +1])
            }
            near.forEach( n => {
              if(tableData[n[0]][n[1]] !== CODE.OPENED){
                checkAround(n[0], n[1])
              }
              
            })
          }
        }

        if(tableData[row][cell] === CODE.NORMAL){ // 내 칸이 닫힌 칸이면 카운트 증가 (이미 연 칸은 count 제외)
          openedCount += 1;
        }

        tableData[row][cell] = count;
        // console.log(around, count);
      })

      checkAround(action.row, action.cell);      
      
      let halted = false;
      let result = '';

      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
      if(state.data.row * state.data.cell - state.data.mine === state.opendCount + openedCount){ //승리 조건
        halted = true;
        result = `You completed in ${state.timer}sec!`
      }
      console.log("Win condition: " + state.data.row * state.data.cell - state.data.mine)
      return {
        ...state,
        tableData,
        opendCount: state.opendCount + openedCount,
        halted,
        result
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
    case INCREAMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1
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

  useEffect( () => {
    let timer;

    if(halted === false){
      timer = setInterval( () => {
        dispatch({type: INCREAMENT_TIMER})
      }, 1000)
    }

    return () => {
      clearInterval(timer);
    }

  }, [halted]);

  return (
    <div id="container">
      <TableContext.Provider value={ value }>
        <Form ></Form>

        <p>{timer}</p>

        <Table ></Table>

        <div>{result}</div>
      </TableContext.Provider>
    </div>
  );

}



export default MineSearch;