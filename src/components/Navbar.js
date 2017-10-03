import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Auth from '../adapters/auth'
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom'



export default class DrawerUndockedExample extends React.Component {

	constructor(props) {
		super(props);
		this.state = { open: false };
		this.handleClose = this.handleClose.bind(this)
	}

	handleToggle = () => this.setState({ open: !this.state.open });

	handleClose = (event) => {
		if (event.target.innerText === "Logout") {
			Auth.logOut()
		}
		this.setState({ open: false });
	}

	render() {
		const rightButtons = (
			<div>
				<FlatButton onClick={this.handleClose} label="Login" />
				<FlatButton onClick={this.handleClose} label="Signup" />
			</div>
		)
		return (
			<div>
				<AppBar
					title="Title"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					onLeftIconButtonTouchTap={this.handleToggle}
					style={{ backgroundColor: '#191a1c', position: "fixed" }}
					iconElementRight={localStorage.getItem('token') ? <FlatButton onClick={this.handleClose} label="Logout" /> : <FlatButton onClick={this.handleClose} label="Login" />}
				/>
				<Drawer
					docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({ open })}>
					<Link to="/" ><MenuItem onClick={this.handleClose}>Search</MenuItem></Link>
					<Link to="/user/listings" ><MenuItem onClick={this.handleClose}>Saved Listings</MenuItem></Link>
					{localStorage.getItem('token') ? <Link to="/"><MenuItem onClick={this.handleClose}>Logout</MenuItem> </Link> : <div><Link to="/login"><MenuItem onClick={this.handleClose}>Login</MenuItem></Link><Link to="/signup"><MenuItem onClick={this.handleClose}>Signup</MenuItem></Link></div>}
				</Drawer>
			</div>
		);
	}
}