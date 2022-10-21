import  React, { Component, useState, useRef, useCallback }  from 'react';
import Try from './components/TryClass';
// import Try from './components/Try';

function getNumbers(){
    const numbers = Array(9).fill().map( (v, i) => v = i + 1); //1부터 9까지 숫자 배열 생성
    const answerArr = [];

    for (let i = 0; i < 4; i++){
        const randomElement = numbers.splice( Math.floor(Math.random() * (9-i)), 1 )[0]; //숫자 랜덤으로 하나 빼고 뺸 숫자 제거
        answerArr.push(randomElement)
    }
    return answerArr
}

const NumberBaseball = () => {
    const [answer, setAnswer] = useState(getNumbers); //lazy init
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [tries, setTries] = useState([]);
    const inputRef = useRef(null);

    const onChange = useCallback((e) => {
        setValue(e.target.value)
    })
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if(value === answer.join('')){
            setResult('HomeRun');
            setTries((prevTries) => {
                return [...prevTries, { try: value, result: 'HomeRun'}]
                
            });

            alert("HomeRun! Game Restart") // alert 후 다시 렌더링

            setAnswer(getNumbers());
            setResult('');
            setValue('');
            setTries([]);
        }
        else {
            if(tries.length >= 9){
                setResult(`You tried over ten times.`);
      
                alert(`You tried over ten times. The answer was ${answer.join('')}. Try it Again`) // alert 후 다시 렌더링
 
                setAnswer(getNumbers());
                setResult('');
                setValue('');
                setTries([]);
            }
            else {
                var inputArr = value.split('').map( v => parseInt(v) ); //입력한 숫자를 배열로 변환
                let strike = 0;
                let ball = 0;
        
                for (let i = 0; i < 4; i++){
                    if(inputArr[i] === answer[i]){
                        strike++;
                    }
                    else if(answer.includes(inputArr[i])){
                        ball++;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, {
                        try: value,                        
                        result: strike + ' Strike, ' + ball + ' Ball'
                    }]
                    
                });
                setResult('');
                setValue('');

                inputRef.current.focus();
            }
        }
    });
    return (
        <div>
            <p>Number Baseball Game</p>
            <form onSubmit={onSubmit}>
                <input type="text" maxLength={4} minLength={4} value={value} onChange={onChange} ref={inputRef} />
                <button>Submit</button>
            </form>
            <p>Try: {tries.length}</p>
            <ul>
                { tries.map( (v, i) => (
                    <Try key={i} tryInfo={v} index={i}></Try>  //component로 불러오기 () 소괄호
                    // return (<li key={i}> {v.try} {v.result}</li>) // {} 중괄호 변경
                ))}
            </ul>

            <p>{result}</p>
        </div>
    )
}

// module.exports = NumberBaseball //require 사용할 때
export default NumberBaseball; //import를 사용할 때