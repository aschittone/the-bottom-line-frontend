import React from 'react';
import createClass from 'create-react-class';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {
	FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
	FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete
} from 'formsy-material-ui/lib';
import Auth from '../adapters/auth'
import SnackBar from './SnackBar'



class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			canSumit: false,
			errorMsg: ''
		}
		this.enableButton = this.enableButton.bind(this)
		this.disableButton = this.disableButton.bind(this)
		this.submitForm = this.submitForm.bind(this)

	}

	errorMessages = {
		wordsError: "Please only use letters",
		numericError: "Please provide a number",
		urlError: "Please provide a valid URL"
	}

	styles = {
		paperStyle: {
			width: 300,
			margin: 'auto',
			padding: 20,
		},
		switchStyle: {
			marginBottom: 16,
		},
		submitStyle: {
			marginTop: 32,
		}
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
		this.setState({
			errorMsg: ''
		})
		const userParams = {
			username: data.email,
			password: data.password
		}
		Auth.login(userParams)
			.then((res) => {
					if (res.msg === "Success") {
						localStorage.setItem("token", res.jwt)
						this.props.history.push("/user/listings")
					} else {
					this.setState({
						errorMsg: res.msg
					})
				}
			})
	}

	notifyFormError(data) {
		console.error('Form error:', data);
	}

	render() {
		let { paperStyle, switchStyle, submitStyle } = this.styles;
		let { wordsError, numericError, urlError } = this.errorMessages;

		return (
			<div>
				{this.state.errorMsg !== '' ? <SnackBar text={this.state.errorMsg}/> : null}
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<Paper style={paperStyle}>
						<Formsy.Form
							onValid={this.enableButton}
							onInvalid={this.disableButton}
							onValidSubmit={this.submitForm}
							onInvalidSubmit={this.notifyFormError}
						>
							<FormsyText
								name="email"
								validations="isEmail"
								validationError={"Please enter a valid email"}
								required
								hintText="Username"
								floatingLabelText="Username"
							/>
							<FormsyText
								name="password"
								type="password"
								required
								hintText="Password"
								floatingLabelText="Password"
								updateImmediately
							/>
							<RaisedButton
								style={submitStyle}
								type="submit"
								label="Submit"
								disabled={!this.state.canSubmit}
							/>
						</Formsy.Form>
					</Paper>
				</MuiThemeProvider>
			</div>
		);
	}
}



export default Main;