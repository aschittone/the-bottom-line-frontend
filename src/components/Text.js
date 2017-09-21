import React from 'react';
import TextField from 'material-ui/TextField';

class TextFieldExampleSimple extends React.Component {
			
	handleChange = (event) => {
		this.props.changePrice(event.target.value)
	}

	render() {
		return (
			<div>
				<br />
					<TextField
						hintText={this.props.label}
						floatingLabelText={this.props.label}
						onChange={this.handleChange}/><br />
				</div>
		)
	}
}

export default TextFieldExampleSimple;