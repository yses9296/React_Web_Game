import React, { Component } from 'react'
// import './App.css';

class ResponseCheck extends Component{

    state = {
        state: 'waiting',
        message: 'Start with a Click',
        result: [],
    }

    timeout;

    onClickScreen = (e) => {
        e.preventDefault();
        if(this.state.state === 'waiting'){
            this.setState({
                state: 'ready',
                message: 'Click when the screen turns blue'
            })

            this.timeout = setTimeout( () => {
                this.setState({
                    state: 'now',
                    message: 'Now Click!'
                })
            }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤

        }
        else if (this.state.state === 'ready'){
            clearTimeout(this.timeout) //now 상태가 나오지 않도록 초기화
            this.setState({
                state: 'waiting',
                message: "Don't be hasty"
            })
        }
        else if (this.state.state === 'now'){
            this.state.result = [...this.state.result, 1];
            console.log(this.state.result)
            this.setState({
                state: 'waiting',
                message: "Start with a Click"
            })
        }
    }


    renderAverage = () => {
        return this.state.result.length === 0 
            ? null 
            : <div>
                <p>Average: {this.state.result.reduce((a,c) => a + c ) / this.state.result.length }ms</p>
             </div>
    }

    render(){
        return(
            <div>
                <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
                    {this.state.message}
                </div>

                {this.renderAverage()}

            </div>
        )
    }
}
export default ResponseCheck;