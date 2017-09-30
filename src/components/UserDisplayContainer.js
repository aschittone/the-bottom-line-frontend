import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import UserListings from './UserListings'
import Auth from '../adapters/auth'
import Welcome from './Welcome';
import RecentSearches from './RecentSearches'
import FinancialProfile from './FinancialProfile'
import SnackBar from './SnackBar'



const layoutStyles = {
	welcome: { marginBottom: '2em', marginLeft: '1em', marginRight: '1em', marginTop: '2em' },
	flex: { display: 'flex' },
	leftCol: { flex: 1, marginRight: '1em', marginLeft: '1em' },
	leftCol: { flex: 1, marginRight: '1em', marginTop: '1em', marginLeft: '1em' },
	rightCol: { flex: 1, marginLeft: '1em' },
	singleCol: { marginTop: '2em' },
};



class GridExampleCelled extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [undefined, 0],
			saved: false
		}

		Auth.me()
			.then((res) => {
				this.setState({
					data: res
				})
			})

		this.saveData = this.saveData.bind(this)
	}

	saveData = (userParams) => {
		Auth.saveFinancialInfo(userParams)
			.then((res) => {
				console.log(res)
				this.setState({
					data: res,
					saved: true
				})
			})
		this.setState({
			saved: false
		})
	}

	deleteListing = (address) => {
		Auth.delete(address)
			.then((res) => {
				this.setState({
					data: res
				})
			})
	}

	render() {
		return (
			<div className="box">
				{this.state.data[0] !== undefined ? <Welcome data={this.state} style={layoutStyles.welcome} /> : null}
				<div style={layoutStyles.flex}>
					<div style={layoutStyles.leftCol}>
						{typeof this.state.data[1] === "object" && this.state.data[1].length < 1 ? <div><h2>You have no saved listings!</h2></div> : <UserListings {...this.state} history={this.props.history} handleClick={this.deleteListing} />}
					</div>
					<div style={layoutStyles.rightCol}>
						<div style={layoutStyles.flex}>
							<RecentSearches />
							<FinancialProfile saveData={this.saveData} />

						</div>
					</div>
				</div>
				{this.state.saved === true ? <SnackBar text="Financial Profile Saved!" /> : null}
			</div>

		)
	}
}


export default GridExampleCelled


