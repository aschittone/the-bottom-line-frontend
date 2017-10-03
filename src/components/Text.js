import React from 'react';
import TextField from 'material-ui/TextField';

class TextFieldExampleSimple extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			errorText: ''
		}
	}

	handleChange = (event) => {
		if (event.target.value === "") {
			this.props.handleChange(0)
		}
		for (var i = 0; i < event.target.value.length; i++) {
			if (!isNaN(parseInt(event.target.value[i]))) {
				this.setState({ errorText: '' })
				this.props.handleChange(event.target.value)
			} else {
				this.setState({ errorText: 'Must Be a Number!' })
			}
		}
	}

	render() {
		return (
			<div>
				<TextField
					hintText={this.props.label}
					floatingLabelText={this.props.label}
					onChange={this.handleChange}
					errorText={this.state.errorText} />
			</div>
		)
	}
}

export default TextFieldExampleSimple;