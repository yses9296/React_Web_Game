import React, { Component } from 'react';

 class RockScissorsPaper extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: 0
    }
    componentDidMount(){ //render가 성공적으로 실행되고난 후 실해될 코드

    }
    componentWillUnmount(){ //component가 제거되기 직전

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