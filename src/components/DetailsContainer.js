import React from 'react'
import { Grid } from 'semantic-ui-react'
import Description from './Description'
import StreetView from './Map'
import HouseDetails from './HouseDetails'
import Analysis from './Analysis'

class GridExampleCelled extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mortgage: '',
			purchasePrice: '',
			downPayment: ''
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

	render() {
		if (this.props.data !== undefined) {
			return (
				<Grid padded relaxed>
					<Grid.Row>
						<Grid.Column width={5}>
							<h1>{this.props.data[0].address.street}, {this.props.data[0].address.city}, {this.props.data[0].address.state} {this.props.data[0].address.zipcode}</h1>
							<StreetView lng={parseFloat(this.props.data[0].address.longitude)} lat={parseFloat(this.props.data[0].address.latitude)} />
						</Grid.Column>
						<Grid.Column width={5}>
							<HouseDetails {...this.props.data} />
						</Grid.Column>
						<Grid.Column width={5}>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column width={5}>
							<Description {...this.props.data} submitForAnalysis={this.submitForAnalysis} />
						</Grid.Column>
						<Grid.Column width={10}>
							<Analysis purchaseInfo={this.state} data={this.props.data} />
						</Grid.Column>
						<Grid.Column width={3}>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)
		} else {
			return (<h1>Loading</h1>)
		}
	}
}

export default GridExampleCelled