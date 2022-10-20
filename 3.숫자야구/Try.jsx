import  React, { Component }  from 'react';

class Try extends Component {

    render(){

        return (
            <li>
                <b>{this.props.value}</b> - {this.props.index}
                <div>Contents</div>
                <div>Contents</div>
                <div>Contents</div>
                <div>Contents</div>
            </li>
        )
    }
}

export default Try; 
