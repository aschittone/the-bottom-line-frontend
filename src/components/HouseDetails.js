import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

export default class ListExampleNested extends React.Component {

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render() {
    console.log(this.props)
    if (this.props[0].useCode.toLowerCase() === "condominium") {
      return (
        <div>
          <List>
            <Subheader>Property Details (2017)</Subheader>
            <ListItem primaryText="Taxes: " leftIcon={<ContentSend />} />
            <ListItem primaryText="HOA Fees: N/A" leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Living Space: ${this.props[0].finishedSqFt} sqft`} leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Property Type: ${this.props[0].useCode}`} leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Year Built: ${this.props[0].yearBuilt}`} leftIcon={<ContentSend />} />
          </List>
        </div>
      );
    } else {
      return (
        <div>
          <List>
            <Subheader>Property Details (2017)</Subheader>
            <ListItem primaryText="Taxes: " leftIcon={<ContentSend />} />
            <ListItem primaryText={`Living Space: ${this.props[0].finishedSqFt} sqft`} leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Lot Size: ${this.props[0].lotSizeSqFt} sqft`} leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Property Type: ${this.props[0].useCode}`} leftIcon={<ContentDrafts />} />
          </List>
        </div>
      );
    }
  }
}