const React = require('react');
const { Component } = require('react');

class NumberBaseball extends Component {
    constructor(props){
        super(props);
        this.state = {
            number : null,
            value: '',
            result: '',
            numberArr: [],
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

        var inputArr = this.state.value.split('');
        for (let i = 0; i < 4; i++){
            this.state.numberArr.push(inputArr[i])
        }


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
                <input type="text" value={this.state.value} onChange={this.onChange} ref={this.onRefInput} />
                <button onClick={this.onSubmit}>Submit</button>
                <p>{this.state.result}</p>
            </div>
        )
    }
}

module.exports = NumberBaseball