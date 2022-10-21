import React, { Component } from 'react';

class RenderTest extends Component {
    state = {
        counter: 0,
    }
    shouldComponentUpdate(nextProps, nextState, nextContext){
        if(this.state.counter !== nextState.counter){
            return true;
        }
        return false;
    }
    onClick = () => {
        this.setState({counter: this.state.counter+1})
    }
    render() {
        return (
            <div> 
                <button onClick={this.onClick}>Click</button>
            </div>
        );
  }
}

export default RenderTest;