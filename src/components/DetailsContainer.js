import React from 'react'
import { Grid } from 'semantic-ui-react'
import Description from './Description'
import StreetView from './Map'
import HouseDetails from './HouseDetails'
import Analysis from './Analysis'
import Alert from './Alert'
import DisplayComps from './DisplayComps'
import SearchBar from './SearchBar'



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
	
	// componentWillMount() {
	// 	debugger
	// }

	render() {
		if (this.props.data !== undefined && this.props.data.status === 500) {
			return (<div><SearchBar /><Alert history={this.props.history} /></div>)
		} else if (this.props.data !== undefined) {
			return (
				<Grid columns='equal' padded relaxed >
					<Grid.Row>
						<Grid.Column width={5}>
							<h1>{this.props.data[0].address.street}, {this.props.data[0].address.city}, {this.props.data[0].address.state} {this.props.data[0].address.zipcode}</h1>
							<StreetView lng={parseFloat(this.props.data[0].address.longitude)} lat={parseFloat(this.props.data[0].address.latitude)} />
						</Grid.Column>
						<Grid.Column width={4}>
							<HouseDetails {...this.props.data} />
						</Grid.Column>
						<Grid.Column >
							<DisplayComps {...this.props.data} getListing={this.props.getListingFromComps}/>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column >
							<Description {...this.props.data} submitForAnalysis={this.submitForAnalysis} />
						</Grid.Column>
						<Grid.Column width={11}>
							<Analysis purchaseInfo={this.state} data={this.props.data} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)
		} else {
			return (<SearchBar {...this.props.data} />)
		}
	}
}

export default GridExampleCelled