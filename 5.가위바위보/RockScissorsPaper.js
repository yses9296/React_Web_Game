import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
    Rock: '0',
    Scissor: '-142px',
    Paper:'-284px'
}

const scores = {
    Scissor: 1,
    Rock: 0,
    Paper: -1
}
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find( (v) => {
        return v[1] === imgCoord;
    })[0];
}

const RockScissorsPaper = () => {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(rspCoords.Rock);
    const interval = useRef();

    useEffect(() => {
        //componentDidmount, componentDidUpdate 역할
        interval.current = setInterval( changeHand, 150 );
        return () => {
            //componentWillUnmount 역할
            clearInterval(interval.current)
        }
    }, [imgCoord]); // 두 번째 인자 배열: 바뀌는 값 >> 값이 바뀔 때마다 useEffect 실행


    const changeHand = () => {
        if(imgCoord === rspCoords.Rock){
            setImgCoord(rspCoords.Scissor);
        }
        else if(imgCoord === rspCoords.Scissor){
            setImgCoord(rspCoords.Paper);
        }
        else if(imgCoord === rspCoords.Paper){
            setImgCoord(rspCoords.Rock);
        }        
    }

    const onClickButton = (value) => {
        clearInterval(interval.current);
        const myScore = scores[value];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if(diff === 0){
            setResult('same')
        }
        else if ([-1, 2].includes(diff)){
            setResult('You Win')
            setScore((prevScore) => prevScore + 1)
        }
        else{
            setResult('You lose')
            setScore((prevScore) => prevScore - 1)
        }

        setTimeout(() => {
            interval.current = setInterval( changeHand, 100 )
        }, 1000)
    }

    return (
        <div id='container'> 
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>

            <button id="rock" className='btn' onClick={() => onClickButton('Rock')}>Rock</button>
            <button id="scissor" className='btn'  onClick={() => onClickButton('Scissor')}>Scissor</button>
            <button id="paper" className='btn'  onClick={() => onClickButton('Paper')}>Paper</button>

            <p>Result: {result}</p>
            <p>Your score is {score}</p>
        </div>
    );
}

export default RockScissorsPaper