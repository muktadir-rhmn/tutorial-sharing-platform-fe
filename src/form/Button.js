import React from 'react';
import './style.css'

class Button extends React.Component {
    render() {
        return (
            <div>
                <button className="btn btn-success btn-block" onClick={this.props.onClick}>{this.props.label}</button>
            </div>
        )
    }
}

export default Button;