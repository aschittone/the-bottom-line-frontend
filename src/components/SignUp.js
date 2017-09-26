import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import Auth from '../adapters/auth'
import SnackBar from './SnackBar'


class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			canSumit: false,
			errorMsg: ""
		}
		this.enableButton = this.enableButton.bind(this)
		this.disableButton = this.disableButton.bind(this)
		this.submitForm = this.submitForm.bind(this)

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
		},
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

	submitForm(data) {
		this.setState({
			errorMsg: ''
		})
		const userParams = {
			name: data.fullName,
			username: data.email,
			password: data.password
		}
		Auth.signup(userParams)
			.then((user) => {
				if (user.msg === "Username already taken") {
					this.setState({
						errorMsg: user.msg
					})
				} else {
					localStorage.setItem("token", user.jwt)
					this.props.history.push("/user/listings")
				}
			})
	}

	notifyFormError(data) {
		console.error('Form error:', data);
	}

	render() {
		let { paperStyle, switchStyle, submitStyle } = this.styles;

		return (
			<div>
				{this.state.errorMsg !== '' ? <SnackBar text="Username already taken! Choose Another"/> : null}
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<Paper style={paperStyle}>
						<Formsy.Form
							onValid={this.enableButton}
							onInvalid={this.disableButton}
							onValidSubmit={this.submitForm}
							onInvalidSubmit={this.notifyFormError}	>
								<FormsyText
								name="fullName"
								required
								hintText="Full Name"
								floatingLabelText="Full Name"
							/>

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
							<FormsyText
								name="repeated_password"
								validations="equalsField:password"
								validationError={"passwords do not match"}
								type="password"
								required
								hintText="Confirm Password"
								floatingLabelText="Confirm Password"
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