import React from 'react';
import Square from './Square';
'use strict';

class Board extends React.Component{
  constructor(props) {
    super(props);
  }

  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  
  renderBoard() {
    let squares = [];
    for (let i=0; i < (this.props.squares.length / 3); i ++) {
      squares.push(this.props.squares.slice(0 + i*3, 3 + i*3));
    }
    const grid = squares.map((value1, index1) => {
      const cells = value1.map((value2, index2) => {
        return this.renderSquare(index1*3 + index2);
      });
      return <div className="board-row" key={index1}>{cells}</div>;
    });
    return grid;
  }
  
  render() {
    return <div>{this.renderBoard()}</div>
  }
}

export default Board;
