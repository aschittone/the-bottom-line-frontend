import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class SnackbarExampleSimple extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: true,
		};
	}

	handleTouchTap = () => {
		this.setState({
			open: true,
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};

	render() {
		return (
			<div>
				<Snackbar
					open={this.state.open}
					message={this.props.text}
					autoHideDuration={4000}
					onRequestClose={this.handleRequestClose}
				/>
			</div>
		);
	}
}