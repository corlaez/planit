import React from 'react';

const style = {
    width: 150, 
    height: 250, 
    border: '5px solid red', 
    borderRadius: 15, 
    fontSize: 30
};

class Card extends React.Component {
    state = {  }

    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick() {        
      this.props.send(this.props.text)
    }

    render() { 
        return <div style={style} onClick={this.onClick}>
            <br/><br/><br/>
            {this.props.text}
        </div>;
    }
}

export default Card;
