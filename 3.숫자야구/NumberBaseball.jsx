import  React, { Component }  from 'react';
import Try from './Try';

function getNumbers(){
    const numbers = Array(9).fill().map( (v, i) => v = i + 1); //1부터 9까지 숫자 배열 생성
    const answerArr = [];
    console.log(numbers);

    for (let i = 0; i < 4; i++){
        const randomElement = numbers.splice( Math.floor(Math.random() * (9-i)), 1 )[0];
        console.log(randomElement);

        answerArr.push(randomElement)
    }
    console.log(answerArr);


    return 
}
class NumberBaseball extends Component {
    constructor(props){
        super(props);
        this.state = {
            answer : getNumbers(),
            value: '',
            result: '',
            tries: [],
            ball: 0,
            strike: 0
        }
    }
    onChange = (e) => {
        this.setState({
            value : e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        // var inputArr = this.state.value.split('');
        // for (let i = 0; i < 4; i++){
        //     this.state.numberArr.push(inputArr[i])
        // }

        this.state.tries.push(this.state.value); //답안지에 내가 제출한 숫자 배열에 저장.

        //초기화
        this.setState({
            value: '',
        })
        this.input.focus();
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
                        // <Try value={v} index={i}></Try>  //component로 불러오기
                        return (<li key={v}> {v} </li>)
                    })}
                </ul>
            </div>
        )
    }
}

// module.exports = NumberBaseball //require 사용할 때
export default NumberBaseball; //import를 사용할 때