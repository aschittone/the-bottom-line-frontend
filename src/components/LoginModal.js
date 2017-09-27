import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogExampleSimple extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
    	open: true,
		};
		this.handleClose = this.handleClose.bind(this)
		this.handleCloseLogin = this.handleCloseLogin.bind(this)
	}

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {	
    this.setState({open: false});
	};
	
	handleCloseLogin = () => {
		this.props.history.history.push('/login')		
    this.setState({open: false});
	};

	handleCloseSignup = () => {
		this.props.history.history.push('/signup')		
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Login"
        primary={true}
        onClick={this.handleCloseLogin}
      />,
      <FlatButton
        label="Signup"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleCloseSignup}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Please Log in or Sign up."
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          You need to log in or sign up in order to save listings!
        </Dialog>
      </div>
    );
  }
}