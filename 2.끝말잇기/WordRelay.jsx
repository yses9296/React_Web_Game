const { Component } = require('react');
const React = require('react');
const { useState, useRef } = React;

class WordRelay extends Component {
    constructor(props){
        super(props);
        this.state = {
            word: '사자',
            value: '',
            result: ''
        };
    }
    onChange = (e) => {
        this.setState({ value: e.target.value });
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length -1] === this.state.value[0]){
            this.setState({
                result: 'Pass',
                word: this.state.value,
                value: '',
            });
            this.input.focus();
        }
        else {
            this.setState({
                result: 'Failed, Try again',
                value: '',
            });
            this.input.focus();
        }
    }

    input;
    onRefInput = (c) => {
        this.input = c;
    }

    render(){
        return(
            <div className='container'>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" placeholder='Enter the word' onChange={this.onChange} value={this.state.value} ref={this.onRefInput}/>
                    <button>Submit</button>
                </form>
                <div>{this.state.result}</div>
            </div>
        )
    }
}

module.exports = WordRelay