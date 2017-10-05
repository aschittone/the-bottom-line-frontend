import React from 'react';
import createClass from 'create-react-class';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyText } from 'formsy-material-ui/lib';
import SnackBar from './SnackBar'
import { Card, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';



const styles = {
	form: {
		padding: '0 1em 1em 1em',
	},
}


class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			canSubmit: false,
			saved: false
		}
		this.enableButton = this.enableButton.bind(this)
		this.disableButton = this.disableButton.bind(this)
		this.submitForm = this.submitForm.bind(this)

	}

	enableButton() {
		this.setState({
			canSubmit: true,
		});
	}

	disableButton() {
		this.setState({
			canSubmit: false,
		});
	}

	submitForm(data, event) {
		const userParams = {
			average_annual_income: data.averageAnnualIncome,
			credit_score: data.creditScore,
			assets: data.assets,
			total_debt: data.totalDebt
		}
		this.props.saveData(userParams)


	}

	notifyFormError(data) {
		console.error('Form error:', data);
	}

	render() {

		return (
			<div>
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<Formsy.Form
						onValid={this.enableButton}
						onInvalid={this.disableButton}
						onValidSubmit={this.submitForm}
						onInvalidSubmit={this.notifyFormError}>
						<div style={styles.form}>
							<FormsyText
								name="averageAnnualIncome"
								validations="isNumeric"
								validationError={"Numbers only!"}
								required
								hintText="Average Annual Income (past 2 years)"
								floatingLabelText="Average Annual Income (past 2 years)"
								style={{ width: 350 }}
								floatingLabelStyle={{ color: '#000' }}
								floatingLabelFocusStyle={{ color: '#000' }}
								underlineFocusStyle={{ borderColor: '#000' }}
							/>

							<FormsyText
								name="assets"
								required
								validations="isNumeric"
								validationError={"Numbers only!"}
								hintText="Assets (cash available for down payment)"
								floatingLabelText="Assets (cash available for down payment)"
								updateImmediately
								style={{ width: 350 }}
								floatingLabelStyle={{ color: '#000' }}
								floatingLabelFocusStyle={{ color: '#000' }}
								underlineFocusStyle={{ borderColor: '#000' }}
							/>

							<FormsyText
								name="totalDebt"
								required
								validations="isNumeric"
								validationError={"Numbers only!"}
								hintText="Total Debt payment (per month)"
								floatingLabelText="Total Debt payment (per month)"
								updateImmediately
								floatingLabelStyle={{ color: '#000' }}
								floatingLabelFocusStyle={{ color: '#000' }}
								underlineFocusStyle={{ borderColor: '#000' }}
							/>

							<FormsyText
								name="creditScore"
								required
								validations="isNumeric,isLength:3"
								validationError={"Must be 3 Numbers only!"}
								hintText="Credit Score"
								floatingLabelText="Credit Score"
								updateImmediately
								floatingLabelStyle={{ color: '#000' }}
								floatingLabelFocusStyle={{ color: '#000' }}
								underlineFocusStyle={{ borderColor: '#000' }}
							/>
							<br></br>
							<br></br>
							<RaisedButton
								type="submit"
								label="Save"
								disabled={!this.state.canSubmit}
							/>
						</div>

					</Formsy.Form>

				</MuiThemeProvider>
			</div >
		);
	}
}

export default Main