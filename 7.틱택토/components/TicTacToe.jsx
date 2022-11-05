import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [ 
    ['', '', ''], 
    ['', '', ''], 
    ['', '', ''] 
  ],
  recentCell: [-1, -1]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL'; 
export const CHANGE_TURN = 'SET_TURN'; 
export const RESET_GAME = 'RESET_GAME'; 

const reducer = (state, action) => {
  switch(action.type){
    case SET_WINNER:
      //state.winner = action.winner (X)
      // 새로운 객체 생성 후 값을 변경하여 넣어주기
      return{
        ...state, 
        winner: action.winner
      }
    case CLICK_CELL:{
      const tableData = [...state.tableData]
      tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결 가능
      tableData[action.row][action.cell] = state.turn;
      
      return {
        ...state, 
        tableData,
        recentCell: [action.row, action.cell]
      }
    }
    case CHANGE_TURN: {
      return {
        ...state, 
        turn: state.turn == 'O' ? 'X' : 'O'
      }
    }
    case RESET_GAME: {
      return{
        ...state,
        turn: 'O',
        tableData: [ 
          ['', '', ''], 
          ['', '', ''], 
          ['', '', ''] 
        ],
        recentCell: [-1, -1]
      }
    }

    default: return state
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, turn, winner, recentCell} = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([ ['', '', ''], ['', '', ''], ['', '', ''] ]); //3x3

  const onClickTable = useCallback( () => {
    dispatch({type: 'SET_WINNER', winner: 'O'}) //action
  }, []);

  useEffect( () => {
    const [row, cell] = recentCell;
    if(row < 0){
      return;
    }

    let win = false;
    //줄 검사
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) win = true;
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) win = true;
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) win = true;
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][2] === turn) win = true;
    //결과
    if(win){
      dispatch({ type: SET_WINNER, winner: turn})
      dispatch({ type: RESET_GAME })
    }
    else{
      let all = true; //칸이 다 차있다 >> 무승부
      tableData.forEach( row => { //무승부 검사
        row.forEach (cell => {
          if(!cell){
            all = false; //칸이 아직 남아 있다
          }
        })
      })

      if(all){
        dispatch({ type: RESET_GAME })
      }else{
        dispatch( {type: CHANGE_TURN})
      }

    }
  }, [tableData])

  return (
    <div>
      <Table onClick = {onClickTable} tableData={state.tableData} dispatch={dispatch}> </Table>
      {state.winner && <p>{state.winner} is Winner!</p> }
    </div>
  )
}


export default TicTacToe;