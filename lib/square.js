import React from 'react';
'use strict';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
          {this.props.value ? (this.props.value == 1 ? "O" : "X") : ""}
      </button>
    );
  }
}

export default Square;
