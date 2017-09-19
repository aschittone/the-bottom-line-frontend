import React from 'react'
import {
	Route,
	Redirect,
} from 'react-router-dom'
import SearchBar from './SearchBar'
import LoadingScreen from './LoadingScreen'
import DetailsContainer from './DetailsContainer'



class gridInstance extends React.Component {
	constructor() {
		super()

		this.state = {
			loading: false,
			data: undefined
		}
	}

	getListing = (address) => {
		console.log('fetching')
		this.setState({
			loading: true,
			data: undefined
		})
		fetch(`http://localhost:3000/api/v1/listings/${address}`)
			.then(res => res.json())
			.then(res => {
					this.setState({
						loading: false,
						data: res
					})
					debugger
			})
	}

	render() {
		if (this.state.data === undefined && this.state.loading === false) {
				return <Redirect to="/search"/>
			} else if (this.state.data === undefined && this.state.loading === true) {
				return <Redirect to="/loading"/>
			} else {
				return <Redirect to="/details"/>
			}
		return (
			<div>
		
				<Route path="/search" component={() => (<SearchBar getListing={this.getListing} />)}/>
				<Route path="/loading" component={LoadingScreen}/>
				<Route path="/details" component={() => (<DetailsContainer />)}/>
				
				</div>
		)
	}
}

export default gridInstance
