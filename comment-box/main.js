import React from 'react';
import ReactDOM from 'react-dom';

const MAX_CHAR = 10;

class CommentBox extends React.Component{
	
	constructor(){
		super();
		this.state ={
			text : ''

		}
		this.update = this.update.bind(this);
	}

	update(e){
		this.setState({text : e.target.value.substr(0, MAX_CHAR)})
	}

	render(){
		return(
			<div>
			<textarea onChange={this.update} value={this.state.text}></textarea>
			<br />
			Max characters - {MAX_CHAR}
			<br />
			Characters Left - {(MAX_CHAR - this.state.text.length)}
			</div>
			)
	}
}

ReactDOM.render(<CommentBox />,
    document.getElementById('app')
);