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
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  goToListing = (address) => {
    this.props.history.history.history.push(`/listing/${address}+second`)
    window.location.reload()
  }

  render() {

    const condos = this.props.data.data.map(address => {
      return (<li onClick={() => this.goToListing(address)}>{address}</li>)
    })

    return (
      <div>
        <Dialog
          title="Property not found, did you mean any of these?"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <ul>
            {condos}
          </ul>
        </Dialog>
      </div>
    );
  }
}