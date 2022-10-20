import  React, { Component }  from 'react';
import Try from './Try';

function getNumbers(){
    const numbers = Array(9).fill().map( (v, i) => v = i + 1); //1부터 9까지 숫자 배열 생성
    const answerArr = [];

    for (let i = 0; i < 4; i++){
        const randomElement = numbers.splice( Math.floor(Math.random() * (9-i)), 1 )[0]; //숫자 랜덤으로 하나 빼고 뺸 숫자 제거
        answerArr.push(randomElement)
    }
    return answerArr
}

class NumberBaseball extends Component {
    state = {
        answer : getNumbers(),
        value: '',
        result: '',
        tries: []
    }
    // setReset = () => {
    //     this.setState({
    //         answer : getNumbers(),
    //         value: '',
    //         result: '',
    //         tries: []
    //     })
    // }
    onChange = (e) => {
        this.setState({
            value : e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){
            this.setState({
                result: 'HomeRun!',
                tries: [...this.state.tries, { try: this.state.value, result: 'HomeRun'}]
            })
            alert("Game ReStart")
            this.setState({
                answer : getNumbers(),
                value: '',
                result: '',
                tries: []
            })

            // this.setReset()
        }
        else{
            if(this.state.tries.length >= 9){
                this.setState({
                    answer : getNumbers(),
                    value: '',
                    result: 'You tried overthen times, Try it Again',
                    tries: []
                })
            }
            else {
                var inputArr = this.state.value.split('').map( v => parseInt(v) ); //입력한 숫자를 배열로 변환
                let strike = 0;
                let ball = 0;
        
                for (let i = 0; i < 4; i++){
                    if(inputArr[i] === this.state.answer[i]){
                        strike++;
                    }
                    else if(this.state.answer.includes(inputArr[i])){
                        ball++;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, {
                        try: this.state.value,                        
                        result: strike + ' Strike, ' + ball + ' Ball'
                    }],
                    value: '',
                    result: ''
                })
                this.input.focus();
            }
        }
    }

    input;
    onRefInput = (c) => {
        this.input = c;
    }

    render(){
        return (
            <div>
                <p>Retrun React</p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" maxLength={4} minLength={4} value={this.state.value} onChange={this.onChange} ref={this.onRefInput} />
                    <button>Submit</button>
                </form>
                <p>Try: {this.state.tries.length}</p>
                <ul>
                    { this.state.tries.map( (v, i) => {
                        // <Try key={v} value={v} index={i}></Try>  //component로 불러오기
                        return (<li key={i}> {v.try} {v.result}</li>)
                    })}
                </ul>

                <p>{this.state.result}</p>
            </div>
        )
    }
}

// module.exports = NumberBaseball //require 사용할 때
export default NumberBaseball; //import를 사용할 때