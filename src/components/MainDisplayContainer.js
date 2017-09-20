import React from 'react'
import {
	Route,
	Redirect,
} from 'react-router-dom'
import SearchBar from './SearchBar'
import DetailsContainer from './DetailsContainer'



class gridInstance extends React.Component {
	constructor() {
		super()

		this.state = {
			data: undefined
		}
	}

	getListing = (address) => {
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
				<Route path="/search" render={(props) => (<SearchBar {...props} getListing={this.getListing} />)}/>
				<Route path="/listing" render={() => (<DetailsContainer {...this.state} />)}/>
			</div>
		)
	}
}

export default gridInstance
