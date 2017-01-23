import React from 'react';
import Board from './Board';
import axios from 'axios';

'use strict';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? -1 : 1;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  componentDidMount() {
    this.upload();
  }

  upload() { 
    this.setState({
        loading: true,
        error: null
    });  
    axios.get(this.props.url)
      .then(res => {
	    setTimeout(() => {
		  let squares = [].concat(...res.data);
		  console.log(squares);
		  let sum = squares.reduce( ( acc, cur ) => acc + cur, 0 );
		  if(sum > 0 || sum < -1) {
		    this.setState({
              loading: false,
              error: { message: "Impossible combination. The game was reset."}
            });
		    this.reset();
		    return;
		  }
		  this.setState({
		    squares: squares,
            xIsNext: sum ? false : true,
		    loading: false,
            error: null
          });
		}, 1000);
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        });
      });
  }
  
  renderLoading() {
    return ( 
	  <div className="status">
	    Loading...
	  </div>
	);
  }

  renderError() {
    return (
      <div className="status">
        Uh oh: {this.state.error.message}
      </div>
    );
  }

  renderPosts() {
    if(this.state.error) {
      return this.renderError();
    }

    return (
      <div className="status">
        Game was uploaded.
      </div>
    );
  }
  
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return "Winner: " + (squares[a]== 1 ? "O" : "X");
      }
    }
    return squares.indexOf(0) == -1 ? "It's a tie": null;
  }
  
  reset() {
     this.setState({
      squares: Array(9).fill(0),
      xIsNext: true
    });
  }
  
  render() {
    const result = this.calculateWinner(this.state.squares);

    let status;
    if (result) {
      status = result + ". Game over!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
	    <div className="game-info">
	      {this.state.loading ?
            this.renderLoading()
            : this.renderPosts()}
		  <button className="button button2" onClick = {() => this.reset()}>
		    Reset
		  </button>
		  <button className="button button2" onClick = {() => this.upload()}>
		    Upload
		  </button>
		  <div className="status">{status}</div>
        </div>
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
 }

export default TicTacToe;
