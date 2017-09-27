import React from 'react'
import { Grid } from 'semantic-ui-react'
import Description from './Description'
import StreetView from './Map'
import HouseDetails from './HouseDetails'
import Analysis from './Analysis'
import Alert from './Alert'
import DisplayComps from './DisplayComps'
import SearchBar from './SearchBar'
import Loading from './LoadingScreen'
import AdditionalPropertyModal from './AdditionalPropertyModal'



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
		let addressPath = fullPath[2]
		console.log('fetching')
		fetch(`http://localhost:3000/api/v1/listings/${addressPath}`)
			.then(res => res.json())
			.then(res => {
				this.setState({
					data: res
				})
			})
	}

	render() {
		if (this.state.data !== undefined && this.state.data.status === 500) {
			return (<div><SearchBar /><Alert history={this.props.history} /></div>)
		} else if (this.state.data !== undefined && typeof this.state.data[1] !== "string") {
			return (
				<Grid columns='equal' padded relaxed >
					<Grid.Row>
						<Grid.Column width={5}>
							<h1>{this.state.data[0].address.street}, {this.state.data[0].address.city}, {this.state.data[0].address.state} {this.state.data[0].address.zipcode}</h1>
							<StreetView lng={parseFloat(this.state.data[0].address.longitude)} lat={parseFloat(this.state.data[0].address.latitude)} />
						</Grid.Column>
						<Grid.Column width={4}>
							<HouseDetails {...this.state.data} {...this.props}/>
						</Grid.Column>
						<Grid.Column >
							<DisplayComps {...this.state.data} {...this.props}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column >
							<Description {...this.state.data} submitForAnalysis={this.submitForAnalysis} />
						</Grid.Column>
						<Grid.Column width={11}>
							<Analysis purchaseInfo={this.state} data={this.state.data} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)
		} else if (this.state.data !== undefined && typeof this.state.data[1] === "string") {
			return (<AdditionalPropertyModal data={this.state} history={this.props}/>)
		} else {
			return (<Loading />)
		}
	}
}

export default GridExampleCelled