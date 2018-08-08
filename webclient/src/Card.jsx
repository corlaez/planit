import React from 'react';

const style = selected => ({
    width: 150, 
    height: 250, 
    border: '5px solid red', 
    borderRadius: 15, 
    fontSize: 30,
    backgroundColor: selected ? 'red' : 'white'
});

const styleWrapper = {
    width: 150,
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

    get isSelected() {
        return this.props.selected === this.props.text
    }

    render() { 
        return <div style={styleWrapper}>
          <div style={style(this.isSelected)} onClick={this.onClick}>
            <br/><br/><br/>
            {this.props.text}
          </div>
          {this.props.show && this.props.members
            .filter(member => member.text === this.props.text)
            .map(member => <div key={member.alias}>{member.alias}</div>)}
        </div>;
    }
}

export default Card;
