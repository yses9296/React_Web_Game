import React, { Component } from 'react';
//constructor(this.state) → render → (ref) → componentDidMount → 
//(setState/props 바뀔 때) → shouldComponentUpdate(true) → render→ componentDidUpdate
//부모가 요소를 없앴을 때 componentWillUnmount → 소멸

const rspCoords = {
    Rock: '0',
    Scissors: '-142px',
    Paper:'-284px'
}

const scores = {
    Rock: 0,
    Scissors: 1,
    Paper: -1
}

 class RockScissorsPaper extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: '0'
    }

    interval;

    componentDidMount(){ //render가 성공적으로 실행되고난 후 실해될 코드 >> 비동기 요청
        this.interval = setInterval( () => {
            if(this.state.imgCoord === rspCoords.Rock){
                this.setState({
                    imgCoord: rspCoords.Scissors
                })
            }
            else if(this.state.imgCoord === rspCoords.Scissors){
                this.setState({
                    imgCoord: rspCoords.Paper
                })
            }
            else if(this.state.imgCoord === rspCoords.Paper){
                this.setState({
                    imgCoord: rspCoords.Rock
                })
            }

        }, 150);

    }
    componentDidUpdate(){ //리렌더링 후

    }
    componentWillUnmount(){ //component가 제거되기 직전 >> 비동기 요청
        clearInterval(this.interval)

    }

    onClickButton = (e) => {
    }


    render() {
        return (
            <div id='container'> 
                <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.state.imgCoord} 0`}}></div>

                <button id="rock" className='btn' onClick={() => this.onClickButton('Rock')}>Rock</button>
                <button id="scissor" className='btn'  onClick={() => this.onClickButton('Scissor')}>Scissor</button>
                <button id="paper" className='btn'  onClick={() => this.onClickButton('Paper')}>Paper</button>

                <p>Result: {this.state.result}</p>
                <p>Your score is {this.state.score}</p>
            </div>
        );
  }
}

export default RockScissorsPaper