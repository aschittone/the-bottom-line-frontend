import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'



const customContentStyle = {
	width: '100%',
	maxWidth: 'none',
};

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */
export default class DialogExampleCustomWidth extends React.Component {
	state = {
		open: true,
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const actions = [
			<Link to="/"><FlatButton
				label="Close"
				primary={true}
			/></Link>
		];

		return (
			<div>
				<SearchBar />
				<Dialog
					title="Dialog With Custom Width"
					actions={actions}
					modal={true}
					contentStyle={customContentStyle}
					open={this.state.open}
				>

				</Dialog>
			</div >
		);
	}
}
