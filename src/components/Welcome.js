import React from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import HomeIcon from 'material-ui/svg-icons/action/home';
import CodeIcon from 'material-ui/svg-icons/action/code';
import FlatButton from 'material-ui/FlatButton';
import Auth from '../adapters/auth'
import CountTo from 'react-count-to';
import { Grid } from 'semantic-ui-react'


const styles = {
	financialInfo: {
		textAlign: 'left'
	}
}


class translate extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			financialData: ''
		}

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			financialData: [nextProps.data.data[0]]
		})

	}

	componentWillMount() {
		Auth.getFinancialData()
			.then(res => {
				this.setState({
					financialData: res
				})
			})

	}

	render() {
		return (
			<Card style={this.props.style}>
				<CardHeader
					title={`Welcome, ${this.props.data.data[0].name}`}
					subtitle="Here's your most recent financial data that you've provided."
					avatar={<Avatar backgroundColor="#FFEB3B" icon={<LightBulbIcon />} />}
				/>
				<div >
					{this.state.financialData[0] === undefined ? <h3>Loading</h3> :
						<div>
							<Grid centered textAlign="center" verticalAlign="bottom">
								<Grid.Row>
									<Grid.Column width={3}>
										<h3>Average Annual Income: $<CountTo to={parseInt(this.state.financialData[0].average_annual_income)} speed={1234} /></h3>
									</Grid.Column>
									<Grid.Column width={3}>
										<h3>Assets: $<CountTo to={parseInt(this.state.financialData[0].assets)} speed={1234} /></h3>
									</Grid.Column>
									<Grid.Column width={3}>
										<h3>Total Debt/month: $<CountTo to={parseInt(this.state.financialData[0].total_debt)} speed={1234} /></h3>
									</Grid.Column>
									<Grid.Column width={3}>
										<h3>Credit Score: <CountTo to={parseInt(this.state.financialData[0].credit_score)} speed={1234} /></h3>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</div>}
				</div>
				<CardActions style={{ textAlign: 'right' }}>
					<FlatButton label="search" icon={<HomeIcon />} href="https://the-bottom-line.herokuapp.com/" />
				</CardActions>
			</Card>
		)
	}
}

export default translate