import React from 'react'
import { Grid } from 'semantic-ui-react'
import Description from './Description'
import StreetView from './Map'
import Analysis from './Analysis'
import Alert from './Alert'
import DisplayComps from './DisplayComps'
import SearchBar from './SearchBar'
import Loading from './LoadingScreen'
import AdditionalPropertyModal from './AdditionalPropertyModal'
import { Card, CardActions } from 'material-ui/Card';
import HouseDetailsTabs from './HouseDetailsTabs'



const styles = {
	main: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		minWidth: 300,
	},
	loading: {
		padding: '0 1em 1em 1em',
	}
}

class GridExampleCelled extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mortgage: '',
			purchasePrice: '',
			downPayment: '',
			data: undefined
		}
	}

	submitForAnalysis = (price, mortgage, dp, hoi, hoa) => {
		this.setState({
			mortgage: mortgage,
			purchasePrice: price,
			downPayment: dp,
			HOA: hoa,
			HOI: hoi,
		})

	}

	componentWillMount() {
		let fullPath = this.props.history.match.url.split("/")
		let addressPath = fullPath[2].replace(/\./g, "")
		console.log('fetching')
		fetch(`http://localhost:3000/api/v1/listings/${addressPath}`)
			.then(res => {
				if (res.status === 500) {
					this.setState({
						data: res
					})
				}
				return res.json()
			})
			.catch(error => console.log(error))
			.then(res => {
				if (res !== undefined) {
					this.setState({
						data: res
					})
				} else {
					console.log('error')
				}
			})
	}

	render() {

		if (this.state.data !== undefined && this.state.data.status === 500) {
			return (<div><SearchBar /><Alert history={this.props.history} /></div>)
		} else if (this.state.data !== undefined && typeof this.state.data[0] === "string") {
			return (<div><SearchBar /> <AdditionalPropertyModal data={this.state} history={this.props} /></div>)
		} else if (this.state.data !== undefined) {
			return (
				<div className="backround" style={{ paddingTop: 64 }}>
					< Grid columns='equal' padded relaxed >
						<Grid.Row>
							<Grid.Column width={5}>
								<h1>{this.state.data[0].address.street}, {this.state.data[0].address.city}, {this.state.data[0].address.state} {this.state.data[0].address.zipcode}</h1>
								<StreetView lng={parseFloat(this.state.data[0].address.longitude)} lat={parseFloat(this.state.data[0].address.latitude)} />
							</Grid.Column>
							<Grid.Column width={4}>
								<HouseDetailsTabs {...this.state.data} {...this.props} />
							</Grid.Column>
							<Grid.Column verticalAlign='middle' textAlign='center' >
								{this.state.data[1] === "Error: comps not available for the specified property identifier" ? <h3>Comparable sales are not available for this property</h3> : <DisplayComps {...this.state.data} {...this.props} />}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column >
								<Description {...this.state} submitForAnalysis={this.submitForAnalysis} />
							</Grid.Column>
							<Grid.Column width={11}>
								<Analysis purchaseInfo={this.state} data={this.state.data} />
							</Grid.Column>
						</Grid.Row>
					</Grid >
				</div >
			)
		} else {
			return (
				<div style={{ ...styles.main }} className='page-wrapper div-with-bg'>
					<div className="blur"></div>
					<Card style={styles.card}>
						<div style={styles.loading}>
							<Loading />
						</div>
					</Card>
				</div>
			)
		}
	}
}

export default GridExampleCelled


