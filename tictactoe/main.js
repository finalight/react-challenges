import React from 'react';
import ReactDOM from 'react-dom';

let turn ='X';
let array = [
	[9,9,9],
	[9,9,9],
	[9,9,9]
];

let player = 1;
let rows = [0,1,2]
let columns = [0,1,2]

class Square extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value : this.props.haha,
			row: this.props.row,
			col: this.props.col
		}
		this.style ={
			border: '1px solid black',

		}
		this.update = this.update.bind(this)
		this.check = this.check.bind(this)
	}

	check(){
		
		if((array[0][0] == "X" && array[1][0] == "X" && array[2][0] == "X") 
			|| (array[0][1] == "X" && array[1][1] == "X" && array[2][1] == "X")
			|| (array[0][2] == "X" && array[1][2] == "X" && array[2][2] == "X")){
console.log("haha")
		}
	}

	update(e){
		if(player == 1){
			player = 2
			turn = 'O'
		}else{
			player = 1
			turn = 'X'
		}

		this.setState({
			value: turn
		})
		array[this.state.row][this.state.col] = turn
		this.check()
	}

	render(){
		return (<td style={this.style} 
			ref = {(input) => this._input = input}
			onClick={this.update}
			id={this.props.index}>
			{this.state.value}
			</td>
			)
	}

}

class TicTacToe extends React.Component{
	
	constructor(){
		super();
	}

	render(){
		let elements;
		let index = 0;
		elements = rows.map((row) => {
			var square = columns.map((col) => {
				index++;
				return <Square haha={array[row][col]} row={row} col={col} index={index} key={index} />
			})
			return (<tr key={row}>{square}</tr>)
		})

		return(
			<div >
			<table>
			<tbody>
				{elements}
			</tbody>
			</table>
			</div>
			)
	}
}

ReactDOM.render(<TicTacToe />,
    document.getElementById('app')
);