import React from 'react';
import ReactDOM from 'react-dom';

const MAX_CHAR = 10;

class Convertor extends React.Component{
	
	constructor(){
		super();
		this.state ={
			value : ''
		}
		this.convert = this.convert.bind(this);
	}

	convert(){
		console.log("value " + this._number.value)
		console.log("input " + this._input.value)
		console.log("output " + this._output.value)
		
		let number = parseFloat(this._number.value)

		if(isNaN(number)){
			number = 0
		}

		if(this._input.value == "cm" && this._output.value == "m"){
			this.setState({value: number/100})
		}else if(this._input.value == "m" && this._output.value == "cm"){
			this.setState({value: number*100})
		}else{
			this.setState({value: "invalid (either non numeric or same type conversion"})
		}
	}

	render(){
		return(
			<div>
			<input type="text" onChange={this.convert} ref={(number) => this._number = number} />
			<select ref={(input) => this._input = input} onChange={this.convert}>
			<option value="cm">cm</option>
			<option value="m">m</option>
			</select>
			<select onChange={this.updateOutput} defaultValue="cm" ref={(input) => this._output = input}>
			<option value="cm">cm</option>
			<option value="m">m</option>
			</select>
			<br />
			{this.state.value}
			</div>
			)
	}
}

ReactDOM.render(<Convertor />,
    document.getElementById('app')
);