import React from 'react'
import { Route } from 'react-router-dom'
import SearchBar from './SearchBar'
import DetailsContainer from './DetailsContainer'
import Login from './Login'
import SignUp from './SignUp'
import UserDisplayContainer from './UserDisplayContainer'
import authorize from './HOC/authorize'



class gridInstance extends React.Component {
	constructor() {
		super()

		this.state = {
			data: ''
		}
	}

	render() {
		return (
			<div>
				<Route path="/search" render={(props) => (<SearchBar {...props} getListing={this.getListing} data={this.state.data} />)} />
				<Route path="/listing/:address" render={(props) => (<DetailsContainer getListingFromComps={this.getListingFromComps} {...this.state} history={props} />)} />
				<Route path="/signup" render={(props) => (<SignUp {...props} />)} />
				<Route path="/login" render={(props) => (<Login {...props} />)} />
				<Route path="/user/listings" render={(props) => (authorize(UserDisplayContainer))} />
			</div>
		)
	}
}

export default gridInstance

