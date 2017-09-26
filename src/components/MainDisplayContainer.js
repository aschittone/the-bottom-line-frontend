import React from 'react'
import {
	Route,
	Redirect,
} from 'react-router-dom'
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
		this.getListing = this.getListing.bind(this)
	}

	getListing = (address) => {
		this.setState({
			data: undefined
		})
		console.log('fetching')
		fetch(`http://localhost:3000/api/v1/listings/${address}`)
			.then(res => res.json())
			.then(res => {
				this.setState({
					data: res
				})
			})
		}

		getListingFromComps = (address) => {
			console.log('fetching')
			fetch(`http://localhost:3000/api/v1/listings/${address}`)
				.then(res => res.json())
				.then(res => {
					this.setState({
						data: res
					})
		  	})
		}

	render() {
		return (
			<div>
				<Route path="/search" render={(props) => (<SearchBar {...props} getListing={this.getListing} data={this.state.data} />)} />
				<Route path="/listing" render={(props) => (<DetailsContainer getListingFromComps={this.getListingFromComps} {...this.state} history={props} />)} />
				<Route path="/signup" render={(props) => (<SignUp {...props} />)} />
				<Route path="/login" render={(props) => (<Login {...props} />)} />
				<Route path="/user/listings" component={authorize(UserDisplayContainer)} />
			</div>
		)
	}
}

export default gridInstance

