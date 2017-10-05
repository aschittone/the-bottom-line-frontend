import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SearchBar from './SearchBar'
import DetailsContainer from './DetailsContainer'
import Login from './Login'
import SignUp from './SignUp'
import UserDisplayContainer from './UserDisplayContainer'
import authorize from './HOC/authorize'
import NotFound from './NotFound';





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
				<Switch>
					<Route exact path="/" render={(props) => (<SearchBar {...props} getListing={this.getListing} data={this.state.data} />)} />
					<Route path="/listing/:address" render={(props) => (<DetailsContainer getListingFromComps={this.getListingFromComps} {...this.state} history={props} />)} />
					<Route path="/signup" render={(props) => (<SignUp {...props} />)} />
					<Route path="/login" render={(props) => (<Login {...props} />)} />
					<Route path="/user/listings" component={authorize(UserDisplayContainer)} />
					<Route component={NotFound} />
				</Switch>
			</div>
		)
	}
}

export default gridInstance

