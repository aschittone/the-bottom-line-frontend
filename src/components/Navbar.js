import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Auth from '../adapters/auth'


export default class DrawerUndockedExample extends React.Component {

	constructor(props) {
		super(props);
		this.state = { open: false };
		this.handleClose = this.handleClose.bind(this)
	}

	handleToggle = () => this.setState({ open: !this.state.open });

	handleClose = (event) => {
		switch (event.target.innerText) {
			case "Search":
				this.props.history.push('/search')
				break;
			case "Saved Listings":
				this.props.history.push('/user/listings')
				break;
			case "Login":
				this.props.history.push('/login')
				break;
			case "Signup":
				this.props.history.push('/signup')
				break;
			case "Logout":
				Auth.logOut()
				this.props.history.push('/search')
				break;
			default:
				null
		}
		
		this.setState({ open: false });
	}

	render() {
		return (
			<div>
				<AppBar
					title="Title"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					onLeftIconButtonTouchTap={this.handleToggle}
					style={{ backgroundColor: '#191a1c', position: "fixed" }}
				/>
				<Drawer
					docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({ open })}
				>
					<MenuItem onClick={this.handleClose}>Search</MenuItem>
					<MenuItem onClick={this.handleClose}>Saved Listings</MenuItem>
					{localStorage.getItem('token') ? <MenuItem onClick={this.handleClose}>Logout</MenuItem> : <div><MenuItem onClick={this.handleClose}>Login</MenuItem><MenuItem onClick={this.handleClose}>Signup</MenuItem></div>}					
				</Drawer>
			</div>
		);
	}
}